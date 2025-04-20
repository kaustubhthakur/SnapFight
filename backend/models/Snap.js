const mongoose = require('mongoose')
const SnapSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    votes: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model("Snap", SnapSchema);