import Router from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  showUsers,
  getUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"
const router = Router();
router.route("/users").post(verifyJwt("admin"), createUser).get(verifyJwt("admin"), showUsers);
router.route("/users/:id").put(updateUser).get(getUser);
router.route("/users/:id").delete(verifyJwt("admin"), deleteUser);
export default router;
