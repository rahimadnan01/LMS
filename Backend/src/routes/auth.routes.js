import Router from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  LoginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(verifyJwt(), logoutUser);
router.route("/refreshToken").post(verifyJwt(), refreshAccessToken);
export default router;
