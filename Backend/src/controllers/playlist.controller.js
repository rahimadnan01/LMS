import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { Playlist } from "../models/playlist.model.js"
import { Audio } from "../models/audio.model.js";
import mongoose from "mongoose";

const createPlaylist = wrapAsync(async (req, res) => {
    let { name, length } = req.body
    if (!name || !length) {
        throw new ApiError(400, "All fields are required")
    }

    let playlist = await Playlist.create({
        name: name,
        length: length
    })

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating the Playlist")
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Playlist created successfully"
            )
        )

})
const updatePlaylist = wrapAsync(async (req, res) => {
    let { name, length } = req.body
    let { playlistId } = req.params

    let playlist = await Playlist.findById(playlistId)

    if (name) playlist.name = name
    if (length) playlist.length = length

    let updatedPlaylist = await playlist.save()
    if (!updatedPlaylist) {
        throw new ApiError(500, "SOmething went wrong while updating the playlist")
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Playlist updated successfully"
            )
        )
})
const deletedPlaylist = wrapAsync(async (req, res) => {
    let { playlistId } = req.params
    let objectId = new mongoose.Types.ObjectId(playlistId)
    if (!playlistId || !objectId) {
        throw new ApiError(404, "Playlist may not found or invalid Id")
    }
    let deletedPlaylist = await Playlist.findByIdAndDelete(
        playlistId,
        {
            new: true
        }
    )

    let deletedAudios = await Audio.deleteMany({ playlist: objectId })
    res.status(200)
        .json(
            new ApiResponse(
                200,
                deletedPlaylist,
                { deletedCount: deletedAudios.deletedCount },
                "playlist deleted successfully"
            )
        )
})
export { createPlaylist, updatePlaylist, deletedPlaylist }