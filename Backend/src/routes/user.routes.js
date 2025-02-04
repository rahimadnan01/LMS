import Router from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/users").post(createUser);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);
export default router;
