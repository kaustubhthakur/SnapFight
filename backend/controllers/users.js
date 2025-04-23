const User = require('../models/User')
const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
    }
}
const getUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
    }
}

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { avatar, description } = req.body;
      

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { avatar, description },
        { new: true }
      );
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  };
  const setProfile = async(req,res)=>{
    try {
        const userid = req.params.id;
        const {avatar} = req.body;
        const user = await User.findById(userid);
        if(user)
            {
                res.status(201).json({message:"fucking bastard"});
            }
            user.avatar = avatar;
            res.status(201).status({message:"avatar has been set bitch"});
    } catch (error) {
        console.error(error);
    }
  }
const deleteUser = async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"user is deleted..."});
    } catch (error) {
        console.error(error);
    }
}
module.exports = {getUser,getUsers,deleteUser,updateUser,setProfile}; 