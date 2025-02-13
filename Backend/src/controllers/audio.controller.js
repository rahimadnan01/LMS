import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Audio } from "../models/audio.model.js";

const addAudio = wrapAsync(async (req, res) => {
    const { name, speaker, details } = req.body
    let { playlistId } = req.params
    if (!name || !speaker || !details) {
        throw new ApiError(400, "All field are required")
    }

    if (!playlistId) {
        throw new ApiError(400, "Playlist Id is not given")
    }



    let existedAudio = await Audio.findOne({ name })
    if (existedAudio) {
        throw new ApiError(400, "Audio already exists")
    }

    let audioPath = req.files?.audioUrl?.[0].path
    if (!audioPath) {
        throw new ApiError(400, "audioPath is required")
    }

    let audioUrl = null
    if (audioPath) {
        audioUrl = await uploadOnCloudinary(audioPath)
    }

    if (!audioUrl) {
        throw new ApiError(500, "something went wrong while uploading the audio")
    }

    let audio = await Audio.create({
        name: name,
        speaker: speaker,
        details: details,
        audioUrl: audioUrl.url,
        playlist: playlistId
    })

    if (!audio) {
        throw new ApiError(500, "Something went wrong while uploading the audio")
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                audio,
                "audio created successfully"
            )
        )
})

const updateAudio = wrapAsync(async (req, res) => {
    let { audioId } = req.params;
    let { name, speaker, details } = req.body;

    let existedAudio = await Audio.findById(audioId);
    if (!existedAudio) {
        throw new ApiError(400, "Audio may deleted or invalid ID");
    }

    let newAudioPath = req.files?.audioUrl?.[0].path;
    if (!newAudioPath) {
        throw new ApiError(400, "Audio file is required");
    }

    let newAudio = null;
    if (newAudioPath) {
        newAudio = await uploadOnCloudinary(newAudioPath);
    }

    if (name) existedAudio.name = name;
    if (speaker) existedAudio.speaker = speaker;
    if (details) existedAudio.details = details;
    if (newAudio) existedAudio.audioUrl = newAudio.url;

    const updatedAudio = await existedAudio.save();
    if (!updatedAudio) {
        throw new ApiError(500, "Something went wrong while updating the Audio");
    }

    res
        .status(200)
        .json(new ApiResponse(200, updatedAudio, "Audio updated Successfully"));
});

const deleteAudio = wrapAsync(async (req, res) => {
    const { audioId } = req.params
    if (!audioId) {
        throw new ApiError(404, "Audio Id is not valid or book may not found")
    }

    const deletedAudio = await Audio.findByIdAndDelete(audioId, { new: true })

    if (!deletedAudio) {
        throw new ApiError(500, "Something went wrong while deleting the Audio")
    }
    res.status(200)
        .json(
            new ApiResponse(
                200,
                deletedAudio,
                "Audio deleted successfully"
            )
        )
});

export { addAudio, updateAudio, deleteAudio }