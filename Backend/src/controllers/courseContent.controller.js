import { wrapAsync } from "../utils/wrapAsync.js";
import { CourseContent } from "../models/courseContent.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";

const createCourseContent = wrapAsync(async (req, res) => {
  let { courseId } = req.params;
  let courseContent = await CourseContent.create({
    course: courseId,
  });

  let updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: {
        courseContent: courseContent._id,
      },
    },
    {
      new: true,
    },
  );
  let courseContentId = courseContent._id;
  if (!courseContent) {
    throw new ApiError(500, "Failed to create new course Content");
  }
  if (!courseContentId) {
    throw new ApiError(500, "Failed to fetch new course Content Id");
  }
  if (!updatedCourse) {
    throw new ApiError(500, "Failed to update course content in Course");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        courseContent,
        updatedCourse,
        "course content created successfully",
      ),
    );
});

export { createCourseContent };
