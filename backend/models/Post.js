const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    snaps: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("Post", PostSchema);