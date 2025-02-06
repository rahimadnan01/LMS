import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
export { Lecture };
