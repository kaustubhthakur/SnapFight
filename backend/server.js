const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const port = 9000;
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const authrouter = require('./routes/auth')
const userrouter = require('./routes/users')
const postrouter = require('./routes/posts')
const snaprouter = require('./routes/snap')
const limiter = rateLimit({
    windowMs: 8 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP, please try again after 8 minutes",
  });
  
app.use(limiter)
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL (not wildcard *)
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('db is connected...')
    } catch (error) {
        console.error(error);
    }
}
connection();
app.use('/auth', authrouter);
app.use('/users', userrouter);
app.use('/posts', postrouter);
app.use('/snaps', snaprouter);
app.listen(port, () => {
    console.log(`server is running on port ${port}...`)
})