const express =require('express')
const router = express.Router();
const {getUser,getUsers,deleteUser,updateUser,setProfile} = require('../controllers/users')
const protectRoute = require('../utils/protectRoute')
router.get('/:id',protectRoute,getUser)
router.get('/',getUsers)
router.delete('/:id',protectRoute,deleteUser)
router.put('/:id/profile',protectRoute,setProfile)
router.put('/:id',protectRoute,updateUser);
module.exports = router;