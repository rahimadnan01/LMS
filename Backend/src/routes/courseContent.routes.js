import Router from "express";
import { createCourseContent } from "../controllers/courseContent.controller.js";
const router = Router();
router.route("/courses/:courseId/courseContent").post(createCourseContent);
export default router;
