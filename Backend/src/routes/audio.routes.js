import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addAudio,
  deleteAudio,
  updateAudio,
} from "../controllers/audio.controller.js";
const router = Router();

router.route("/playlist/:playlistId/audios").post(
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
    upload.fields([
      {
        name: "audioUrl",
        maxCount: 1,
      },
    ]),
    updateAudio,
  )
  .delete(deleteAudio);

export default router;
