import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: String,
    },
    certificate: {
      type: String,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courseContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseContent",
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);
export { Course };
