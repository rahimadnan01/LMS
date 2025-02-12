import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPdf, deletePdf, updatePdf } from "../controllers/books.controller.js";
const router = Router();
router.route("/books").post(
  upload.fields([
    {
      name: "bookUrl",
      maxCount: 1,
    },
  ]),
  createPdf,
);
router.route("/books/:bookId").put(
  upload.fields([
    {
      name: "bookUrl",
      maxCount: 1,
    },
  ]),
  updatePdf,
).delete(deletePdf);
export default router;
