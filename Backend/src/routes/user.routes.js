import Router from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  showUsers,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/users").post(createUser).get(showUsers);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);
export default router;
