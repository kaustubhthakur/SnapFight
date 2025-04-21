const express =require('express')
const router = express.Router();
const {createSnap,getsnap} = require('../controllers/snaps')
const protectRoute = require('../utils/protectRoute')
router.get('/:id',protectRoute,getsnap)
router.post('/:id',protectRoute,createSnap)
module.exports = router;
