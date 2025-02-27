import mongoose from "mongoose";
const audioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      maxLength: 100,
      required: true,
    },
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  },
  { timestamps: true },
);

const Audio = mongoose.model("Audio", audioSchema);

export { Audio };
