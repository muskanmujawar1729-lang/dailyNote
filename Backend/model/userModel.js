import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    date: {
        type: Date,
    },
    subject: {
        type: String,
    },
    text: {
        type: String
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);