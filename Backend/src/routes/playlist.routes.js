import Router from "express"
import { createPlaylist, deletedPlaylist, updatePlaylist } from "../controllers/playlist.controller.js"
const router = Router()
router.route("/playlist").post(createPlaylist)
router.route("/playlist/:playlistId").put(updatePlaylist).delete(deletedPlaylist)

export default router