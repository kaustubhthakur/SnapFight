const Post = require('../models/Post')
const Snap = require('../models/Snap');
const cloudinary = require('cloudinary')
const createSnap = async (req, res) => {
    try {

        const postId = req.params.id;
        const { image } = req.body;

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }
        const newsnap = new Snap({ image });


        const savedSnap = await newsnap.save();
        try {
            await Event.findByIdAndUpdate(postId, {
                $push: { snaps: savedSnap._id },
            });
        } catch (err) {
            next(err);
        }



    } catch (error) {
        console.error(error);
    }
}
module.exports = { createSnap };