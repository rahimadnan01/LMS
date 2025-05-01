import mongoose from "mongoose"
const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profilePic: {
        type: String
    },
    introduction: {
        type: String
    }

}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema)
export { Admin }