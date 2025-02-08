import Router from "express";

import {
  createCourse,
  deleteCourse,
  showCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/courses")
  .post(
    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
      {
        name: "certificate",
        maxCount: 1,
      },
    ]),
    verifyJwt,
    createCourse
  )
  .get(showCourses);

router.route("/courses/:id").put(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "certificate",
      maxCount: 1,
    },
  ]),
  updateCourse
);

router.route("/courses/:id").delete(deleteCourse);
export default router;
