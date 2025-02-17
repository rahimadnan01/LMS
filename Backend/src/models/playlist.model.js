import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Playlist = mongoose.model("Playlist", playlistSchema);
export { Playlist };
