import { Course } from "../models/course.model.js";
import { CourseContent } from "../models/courseContent.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const createCourse = wrapAsync(async (req, res) => {
  let { name, length, description, thumbnail, certificate } = req.body;
  if (!name || !length || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const thumbnailPath = req.files?.thumbnail[0].path;
  const certificatePath = req.files?.certificate[0].path;

  if (!thumbnailPath) {
    throw new ApiError(400, "thumbnail path is required");
  }
  if (!certificatePath) {
    throw new ApiError(400, "certificate path is required");
  }

  const thumbnailUrl = await uploadOnCloudinary(thumbnailPath);
  const certificateUrl = await uploadOnCloudinary(certificatePath);

  if (!thumbnailUrl) {
    throw new ApiError(500, "failed to upload thumbnail");
  }

  if (!certificateUrl) {
    throw new ApiError(500, "Failed to upload certificate");
  }

  const course = await Course.create({
    name: name,
    length: length,
    description: description,
    creator: req.user._id,
    thumbnail: thumbnailUrl.url,
    certificate: certificateUrl.url,
  });

  const createdCourse = await Course.findById(course._id);

  if (!createdCourse) {
    throw new ApiError(500, "Failed to create a new Course");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdCourse, "course created successfully"));
});

const updateCourse = wrapAsync(async (req, res) => {
  let { name, length, description } = req.body;

  let { id } = req.params;

  let newThumbnailPath = req.files?.thumbnail?.[0].path;
  let newCertificatePath = req.files?.certificate?.[0].path;

  let newThumbnailUrl = null;
  let newCertificateUrl = null;

  if (newThumbnailPath) {
    newThumbnailUrl = await uploadOnCloudinary(newThumbnailPath);
  }
  if (newCertificatePath) {
    newCertificateUrl = await uploadOnCloudinary(newCertificatePath);
  }

  const course = await Course.findById(id);

  if (name) course.name = name;
  if (description) course.description = description;
  if (length) course.length = length;
  if (newThumbnailUrl) course.thumbnail = newThumbnailUrl.url;
  if (newCertificateUrl) course.certificate = newCertificateUrl.url;

  await course.save();
  let updatedCourse = await Course.findById(course._id);

  if (!updatedCourse) {
    throw new ApiError(500, "failed to update Course");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});

const deleteCourse = wrapAsync(async (req, res) => {
  let { id } = req.params;
  if (!id) {
    throw new ApiError(400, "ID is not given");
  }
  let deletedCourse = await Course.findByIdAndDelete(id, { new: true });
  if (!deletedCourse) {
    throw new ApiError(500, "Something went wrong while deleting the course");
  }
  let deletedCourseContent = await CourseContent.findOneAndDelete({
    course: id,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedCourse,
        deletedCourseContent,
        "Course deleted successfully",
      ),
    );
});

const showCourses = wrapAsync(async (req, res) => {
  const courses = await Course.find({});
  if (!courses) {
    throw new ApiError(500, "Failed to fetch Courses");
  }

  res.status(200).json(200, courses, "Courses fetched successfully");
});

const showSingleCourse = wrapAsync(async (req, res) => {
  let { id } = req.params
  if (!id) {
    throw new ApiError(404, "Course may deleted or Invalid ID")
  }
  const course = await Course.findById(id).populate({
    path: "creator",
    select: "username email role"
  }).populate({
    path: "courseContent",
    populate: {
      path: "modules",
      select: "name",
      populate: {
        path: "lectures",
        select: "name duration video"
      }
    }
  })

  if (!course) {
    throw new ApiError(500, "Something went wrong while Showing the course")
  }
  res.status(200)
    .json(
      new ApiResponse(
        200,
        "Course shown successfully",
        course
      )
    )
})

export { createCourse, updateCourse, deleteCourse, showCourses, showSingleCourse };
