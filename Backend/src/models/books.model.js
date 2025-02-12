import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bookUrl: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      maxLength: 100,
      required: true,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
