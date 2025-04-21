const express =require('express')
const router = express.Router();
const {createpost,deletepost,getpost,getposts,likeSnap} = require('../controllers/posts')
const protectRoute = require('../utils/protectRoute')
router.get('/:id',protectRoute,getpost)
router.get('/',getposts)
router.delete('/:id',protectRoute,deletepost)
router.post('/',protectRoute,createpost)
router.put('/:id/:sid',protectRoute,likeSnap)
module.exports = router;
