import Router from "express";
import {
  createPlaylist,
  deletedPlaylist,
  getPlaylist,
  showPlaylists,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/playlist").post(verifyJwt("admin"), createPlaylist).get(showPlaylists);
router
  .route("/playlist/:playlistId")
  .put(verifyJwt("admin"), updatePlaylist)
  .delete(verifyJwt("admin"), deletedPlaylist)
  .get(getPlaylist);

export default router;
