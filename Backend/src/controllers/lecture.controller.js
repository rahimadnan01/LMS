import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Module } from "../models/module.model.js";
import { Lecture } from "../models/lecture.model.js";
import mongoose from "mongoose";

const createLecture = wrapAsync(async (req, res) => {
  let { moduleId } = req.params;
  let { name } = req.body;

  if (!name) {
    throw new ApiError(400, "All Fields are required");
  }

  if (!moduleId) {
    throw new ApiError(404, "Module not found");
  }

  let videoPath = req.files?.video?.[0].path;

  if (!videoPath) {
    throw new ApiError(400, "Video field is required");
  }

  let videoUrl = null;
  if (videoPath) {
    videoUrl = await uploadOnCloudinary(videoPath);
  }

  let lecture = await Lecture.create({
    name: name,
    duration: videoUrl.duration,
    video: videoUrl.url,
    module: moduleId,
  });

  if (!lecture) {
    throw new ApiError(500, "Something went wrong while creating a lecture");
  }

  let updatedModule = await Module.findByIdAndUpdate(
    moduleId,
    {
      $push: { lectures: lecture._id },
    },
    {
      new: true,
    },
  );

  if (!updatedModule) {
    throw new ApiError(500, "Something went wrong while updating the Module");
  }

  res
    .status(200)
    .json(new ApiResponse(200, lecture, "Lecture created successfully"));
});

const updateLecture = wrapAsync(async (req, res) => {
  let name = req.body.name;
  let { moduleId, lectureId } = req.params;
  console.log(moduleId, lectureId, name);

  if (!name) {
    throw new ApiError(400, "All fields are required");
  }

  if (!moduleId || !lectureId) {
    throw new ApiError(404, "Module or lecture may not found or deleted");
  }

  let newVideoPath = req.files?.video?.[0].path;

  if (!newVideoPath) {
    throw new ApiError(400, "Video field is required");
  }

  let newVideo = null;

  if (newVideoPath) {
    newVideo = await uploadOnCloudinary(newVideoPath);
  }

  let updatedLecture = await Lecture.findByIdAndUpdate(
    lectureId,
    {
      $set: {
        video: newVideo.url,
        name: name,
        duration: newVideo.duration,
        module: moduleId,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedLecture) {
    throw new ApiError(500, "Something went wrong while updating the lecture");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedLecture, "Lecture updated Successfully"));
});

const deleteLecture = wrapAsync(async (req, res) => {
  let { moduleId, lectureId } = req.params;
  let ObjectId = new mongoose.Types.ObjectId(lectureId);
  if (!moduleId || !lectureId) {
    throw new ApiError(404, "module may deleted");
  }

  let deletedLecture = await Lecture.findByIdAndDelete(lectureId, {
    new: true,
  });

  if (!deletedLecture) {
    throw new ApiError(500, "something went wrong while deleting the Lecture");
  }

  let updatedModule = await Module.findOneAndUpdate(
    { _id: moduleId },
    { $pull: { lectures: ObjectId } },
    {
      new: true,
    },
  );

  if (!updatedModule) {
    throw new ApiError(500, "Something went wrong while updating the module");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deleteLecture, "Lecture deleted successfully"));
});
export { createLecture, updateLecture, deleteLecture };
