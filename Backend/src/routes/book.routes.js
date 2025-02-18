import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPdf,
  deletePdf,
  showAllBooks,
  showSingleBook,
  updatePdf,
} from "../controllers/books.controller.js";
const router = Router();
router.route("/books").post(
  upload.fields([
    {
      name: "bookUrl",
      maxCount: 1,
    },
  ]),
  createPdf,
).get(showAllBooks);
router
  .route("/books/:bookId")
  .put(
    upload.fields([
      {
        name: "bookUrl",
        maxCount: 1,
      },
    ]),
    updatePdf,
  )
  .delete(deletePdf).get(showSingleBook);
export default router;
