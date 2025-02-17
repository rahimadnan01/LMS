import Router from "express";
import {
  createLecture,
  deleteLecture,
  getAllLectures,
  getSingleLecture,
  updateLecture,
} from "../controllers/lecture.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route(
    "/courses/:courseId/courseContent/:courseContentId/module/:moduleId/lecture",
  )
  .post(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
    ]),
    createLecture,
  ).get(getAllLectures);

router
  .route(
    "/courses/:courseId/courseContent/:courseContentId/module/:moduleId/lecture/:lectureId",
  )
  .put(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
    ]),
    updateLecture,
  )
  .delete(deleteLecture).get(getSingleLecture);
export default router;
