import Router from "express";
import {
  createModule,
  deleteModule,
  updateModule,
} from "../controllers/module.controller.js";
const router = Router();

router
  .route("/courses/:courseId/courseContent/:courseContentId/module")
  .post(createModule);
router
  .route("/courses/:courseId/courseContent/:courseContentId/module/:moduleId")
  .put(updateModule)
  .delete(deleteModule);
export default router;
