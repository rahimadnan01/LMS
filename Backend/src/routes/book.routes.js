import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPdf,
  deletePdf,
  showAllBooks,
  showSingleBook,
  updatePdf,
} from "../controllers/books.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/books").post(
  verifyJwt("admin"),
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
    verifyJwt("admin"),
    upload.fields([
      {
        name: "bookUrl",
        maxCount: 1,
      },
    ]),
    updatePdf,
  )
  .delete(verifyJwt("admin"), deletePdf).get(showSingleBook);
export default router;
