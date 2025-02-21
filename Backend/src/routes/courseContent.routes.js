import Router from "express";
import { createCourseContent } from "../controllers/courseContent.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/courses/:courseId/courseContent").post(verifyJwt("admin"), createCourseContent);
export default router;
