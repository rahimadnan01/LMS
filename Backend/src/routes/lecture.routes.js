import Router from "express";
import {
  createLecture,
  deleteLecture,
  getAllLectures,
  getSingleLecture,
  updateLecture,
} from "../controllers/lecture.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();

router
  .route(
    "/courses/:courseId/courseContent/:courseContentId/module/:moduleId/lecture",
  )
  .post(
    verifyJwt("admin"),
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
    verifyJwt("admin"),
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
    ]),
    updateLecture,
  )
  .delete(verifyJwt("admin"), deleteLecture).get(getSingleLecture);
export default router;
