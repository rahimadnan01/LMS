import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { uploadPdfOnCloudinary } from "../utils/cloudinaryPdf.js";
import { Book } from "../models/books.model.js";

const createPdf = wrapAsync(async (req, res) => {
  let { name, author, details } = req.body;
  if (!name || !author || !details) {
    throw new ApiError(400, "All fields are required");
  }
  let pdfPath = req.files?.bookUrl?.[0].path;
  if (!pdfPath) {
    throw new ApiError(400, "Pdf file is required");
  }

  let pdf = null;
  if (pdfPath) {
    pdf = await uploadPdfOnCloudinary(pdfPath);
  }

  let book = await Book.create({
    name: name,
    author: author,
    bookUrl: pdf.url,
    details: details,
  });

  let createdBook = await Book.findById(book._id);
  if (!createdBook) {
    throw new ApiError(500, "Something went wrong  while uploading the book");
  }
  res
    .status(200)
    .json(new ApiResponse(200, createdBook, "Book uploaded successfully"));
});
const updatePdf = wrapAsync(async (req, res) => {
  let { bookId } = req.params;
  let { name, author, details } = req.body;

  let existedPdf = await Book.findById(bookId);
  if (!existedPdf) {
    throw new ApiError(400, "Book may deleted or invalid ID");
  }

  let newBookPath = req.files?.bookUrl?.[0].path;
  if (!newBookPath) {
    throw new ApiError(400, "Book file is required");
  }

  let newBook = null;
  if (newBookPath) {
    newBook = await uploadPdfOnCloudinary(newBookPath);
  }

  if (name) existedPdf.name = name;
  if (author) existedPdf.author = author;
  if (details) existedPdf.details = details;
  if (newBook) existedPdf.bookUrl = newBook.url;

  const updatedBook = await existedPdf.save();
  if (!updatedBook) {
    throw new ApiError(500, "Something went wrong while updating the Book");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated Successfully"));
});
const deletePdf = wrapAsync(async (req, res) => {
  const { bookId } = req.params
  if (!bookId) {
    throw new ApiError(404, "Book Id is not valid or book may not found")
  }

  const deletedBook = await Book.findByIdAndDelete(bookId, { new: true })

  if (!deletedBook) {
    throw new ApiError(500, "Something went wrong while deleting the book")
  }
  res.status(200)
    .json(
      new ApiResponse(
        200,
        deletedBook,
        "Book deleted successfully"
      )
    )
});

export { createPdf, updatePdf, deletePdf };
