import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { CourseContent } from "../models/courseContent.model.js";
import { Module } from "../models/module.model.js";
import mongoose from "mongoose";

const createModule = wrapAsync(async (req, res) => {
  let { courseId, courseContentId } = req.params;
  let { name } = req.body;
  if (!courseId) {
    throw new ApiError(400, "Course Id id not defined");
  }

  if (!courseContentId) {
    throw new ApiError(400, "Course Content Id is not defined");
  }

  let module = await Module.create({
    name: name,
    courseContent: courseContentId,
  });

  if (!module) {
    throw new ApiError(500, "Something went wrong while creating Module");
  }

  let updatedCourseContent = await CourseContent.findByIdAndUpdate(
    courseContentId,
    {
      $push: {
        modules: module._id,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedCourseContent) {
    throw new ApiError(
      500,
      "Something went wrong while updating the courseContent",
    );
  }
  let course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(500, "failed to upload course");
  }
  res
    .status(200)
    .json(new ApiResponse(200, module, "course updated successfully"));
});

const updateModule = wrapAsync(async (req, res) => {
  let { moduleId } = req.params;
  let { name } = req.body;

  if (name === "") {
    throw new ApiError(400, "Name field is required");
  }
  if (!moduleId) {
    throw new ApiError(400, "Module Id is not given");
  }
  let updatedModule = await Module.findByIdAndUpdate(
    moduleId,
    {
      $set: {
        name: name,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedModule) {
    throw new ApiError(500, "Something went wrong while updating the module");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedModule, "Module updated successfully"));
});

const deleteModule = wrapAsync(async (req, res) => {
  let { courseContentId, moduleId } = req.params;

  if (!courseContentId || !moduleId) {
    throw new ApiError(400, "Id is not given");
  }

  let objectIdModuleId = new mongoose.Types.ObjectId(moduleId);

  let deletedModule = await Module.findByIdAndDelete(moduleId);

  if (!deletedModule) {
    throw new ApiError(404, "Module not found or already deleted");
  }

  let updatedCourseContent = await CourseContent.findOneAndUpdate(
    { _id: courseContentId },
    { $pull: { modules: objectIdModuleId } },
    { new: true },
  );

  if (!updatedCourseContent) {
    throw new ApiError(
      500,
      "Something went wrong while updating the course Content",
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedModule, "Module deleted successfully"));
});

const showModules = wrapAsync(async (req, res) => {
  const { courseContentId } = req.params;
  let ObjectId = new mongoose.Types.ObjectId(courseContentId);
  const allModules = await Module.aggregate([
    {
      $match: {
        courseContent: ObjectId,
      },
    },
    {
      $lookup: {
        from: "lectures",
        localField: "_id",
        foreignField: "module",
        as: "lectures",
      },
    },
  ]);

  if (!allModules.length === 0) {
    throw new ApiError(500, "Something went wrong while showing the modules");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "modules shown successfully", allModules));
});

const getSingleModule = wrapAsync(async (req, res) => {
  const { moduleId } = req.params;
  let ObjectModuleId = new mongoose.Types.ObjectId(moduleId)
  if (!moduleId || !ObjectModuleId) {
    throw new ApiError(404, "Module may deleted or invalid Id")
  }

  const module = await Module.findById(moduleId).populate({
    path: "lectures",
    select: "name duration video"
  })

  if (!module) {
    throw new ApiError(500, "Something went wrong while fetching the Modules")
  }

  res.status(200)
    .json(
      new ApiResponse(
        200,
        "Module shown successfully",
        module
      )
    )
});
export { createModule, updateModule, deleteModule, showModules, getSingleModule };
