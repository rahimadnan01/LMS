import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const CourseContent = mongoose.model("CourseContent", courseContentSchema);

export { CourseContent };
