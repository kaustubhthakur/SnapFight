const express =require('express')
const router = express.Router();
const upload = require('../utils/upload')
const {createSnap,getsnap} = require('../controllers/snaps')
const protectRoute = require('../utils/protectRoute')
router.get('/:id',protectRoute,getsnap)
router.post('/:id',upload.single('image'), protectRoute,createSnap)
module.exports = router;
