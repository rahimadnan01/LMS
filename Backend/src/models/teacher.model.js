import mongoose from "mongoose"
const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })

const Teacher = mongoose.model("Teacher", teacherSchema)
export { Teacher }