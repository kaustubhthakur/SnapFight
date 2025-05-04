const Post = require('../models/Post')
const Snap = require('../models/Snap');
const cloudinary = require('../utils/cloudinary')
const createSnap = async (req, res) => {
    try {

        const postId = req.params.id;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(image);
        const dx = uploadResponse.secure_url
        const newsnap = new Snap({ image: dx });


        const savedSnap = await newsnap.save();
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { snaps: savedSnap._id },
            });
        } catch (err) {
            console.log(err)
        }
        res.status(201).json(savedSnap);
    } catch (error) {
        console.error(error);
    }
}
const getsnap = async (req, res) => {
    try {
        const snap = await Snap.findById(req.params.id);
        res.status(201).json(snap);
    } catch (error) {
        console.error(error);
    }
}
module.exports = { createSnap, getsnap };