import Router from "express";
import {
  createModule,
  deleteModule,
  getSingleModule,
  showModules,
  updateModule,
} from "../controllers/module.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();

router
  .route("/courses/:courseId/courseContent/:courseContentId/module")
  .post(verifyJwt("admin"), createModule)
  .get(showModules);
router
  .route("/courses/:courseId/courseContent/:courseContentId/module/:moduleId")
  .put(verifyJwt("admin"), updateModule).get(getSingleModule)
  .delete(verifyJwt("admin"), deleteModule);
export default router;
