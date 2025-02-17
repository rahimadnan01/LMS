import Router from "express";
import {
  createModule,
  deleteModule,
  getSingleModule,
  showModules,
  updateModule,
} from "../controllers/module.controller.js";
const router = Router();

router
  .route("/courses/:courseId/courseContent/:courseContentId/module")
  .post(createModule)
  .get(showModules);
router
  .route("/courses/:courseId/courseContent/:courseContentId/module/:moduleId")
  .put(updateModule).get(getSingleModule)
  .delete(deleteModule);
export default router;
