import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseContent",
    },
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
  },
  { timestamps: true },
);

const Module = mongoose.model("Module", moduleSchema);

export { Module };
