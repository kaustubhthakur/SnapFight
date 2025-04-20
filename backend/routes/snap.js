const express =require('express')
const router = express.Router();
const {createSnap} = require('../controllers/snaps')
const protectRoute = require('../utils/protectRoute')
//router.get('/:id',protectRoute,getsnaps)
router.post('/:id',protectRoute,createSnap)
module.exports = router;
