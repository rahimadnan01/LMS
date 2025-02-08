import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  { timestamps: true }
);

const CourseContent = mongoose.model("CourseContent", courseContentSchema);

export { CourseContent };
