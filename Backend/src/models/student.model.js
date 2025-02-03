import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    profilePic: {
      type: String,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    progress: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
