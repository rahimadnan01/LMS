import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addAudio,
  deleteAudio,
  updateAudio,
} from "../controllers/audio.controller.js";
const router = Router();
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/playlist/:playlistId/audios").post(
  verifyJwt("admin"),
  upload.fields([
    {
      name: "audioUrl",
      maxCount: 1,
    },
  ]),
  addAudio,
);

router
  .route("/audios/:audioId")
  .put(
    verifyJwt("admin"),
    upload.fields([
      {
        name: "audioUrl",
        maxCount: 1,
      },
    ]),
    updateAudio,
  )
  .delete(verifyJwt("admin"), deleteAudio);

export default router;
