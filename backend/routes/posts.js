const express =require('express')
const router = express.Router();
const {createpost,deletepost,getpost,getposts} = require('../controllers/posts')
const protectRoute = require('../utils/protectRoute')
router.get('/:id',protectRoute,getpost)
router.get('/',getposts)
router.delete('/:id',protectRoute,deletepost)
router.post('/',protectRoute,createpost)
module.exports = router;
