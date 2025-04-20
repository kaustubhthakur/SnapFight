const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const app = express();
const port = 9000;
const mongoose = require('mongoose')
require('dotenv').config();
const authrouter = require('./routes/auth')
const userrouter = require('./routes/users')
app.use(express.json())
app.use(cors())
app.use(cookieparser());

const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('db is connected...')
    } catch (error) {
        console.error(error);
    }
}
connection();
app.use('/auth',authrouter)
app.use('/users',userrouter)
app.listen(port,() =>{
    console.log(`server is running on port ${port}...`)
})