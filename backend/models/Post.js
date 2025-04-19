const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
     description: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    votes: {
        type: Map,
        of: [String],
        default: new Map()
    },
   
}, {
    timestamps: true,
})
module.exports = mongoose.model("Post", PostSchema);