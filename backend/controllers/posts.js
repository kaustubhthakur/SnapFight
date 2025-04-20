const Post = require('../models/Post')
const createpost = async(req,res) =>{
    try {
        const newpost = new Post(req.params);
        const savepost = await newpost.save();
        res.status(201).json(savepost)
    } catch (error) {
        console.error(error);
    }
}
const getpost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
    }
}
const getposts = async(req,res) =>{
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const deletepost = async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"post has been deleted..."})
    } catch (error) {
        console.error(error);
    }
}
module.exports = {createpost,deletepost,getpost,getposts}