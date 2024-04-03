import mongoose, { Schema } from 'mongoose'

const shcmea = new mongoose.Schema({
    name: String,
})

export const Categorymodle = mongoose.models.category || mongoose.model("category", shcmea)
