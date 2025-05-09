const Post = require('../models/Post')
const Snap = require('../models/Snap')
const createpost = async (req, res) => {
    try {
        const newpost = new Post(req.body);
        const savepost = await newpost.save();
        res.status(201).json(savepost)
    } catch (error) {
        console.error(error);
    }
}
const getpost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
    }
}
const getposts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const deletepost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "post has been deleted..." })
    } catch (error) {
        console.error(error);
    }
}
const likeSnap = async (req, res) => {
    try {
        const snapId = req.params.sid;
        const userId = req.user._id;
        const postId = req.body.id;

        const snap = await Snap.findById(snapId);

        if (!snap) {
            return res.status(404).json({ message: "Snap not found" });
        }

        if (postId) {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }


            if (!post.snaps.includes(snapId)) {
                return res.status(400).json({ message: "This snap does not belong to the specified post" });
            }


            const allPostSnaps = await Snap.find({ _id: { $in: post.snaps } });
            const hasVotedOtherSnap = allPostSnaps.some(
                otherSnap => otherSnap._id.toString() !== snapId && otherSnap.votes.includes(userId)
            );

            if (hasVotedOtherSnap) {
                return res.status(400).json({
                    message: "You have already voted on another snap in this post",
                    success: false
                });
            }
        }
        if (!snap.votes.includes(userId)) {

            await Snap.updateOne(
                { _id: snapId },
                { $push: { votes: userId } }
            );
            res.status(200).json({
                message: "Snap has been liked",
                success: true,
                snap: await Snap.findById(snapId)
            });
        } else {
            await Snap.updateOne(
                { _id: snapId },
                { $pull: { votes: userId } }
            );

            res.status(200).json({
                message: "Snap has been unliked",
                success: true,
                snap: await Snap.findById(snapId) // Return updated snap
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};
module.exports = { createpost, deletepost, getpost, getposts, likeSnap }