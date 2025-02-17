import Router from "express";
import {
  createPlaylist,
  deletedPlaylist,
  getPlaylist,
  showPlaylists,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
const router = Router();
router.route("/playlist").post(createPlaylist).get(showPlaylists);
router
  .route("/playlist/:playlistId")
  .put(updatePlaylist)
  .delete(deletedPlaylist)
  .get(getPlaylist);

export default router;
