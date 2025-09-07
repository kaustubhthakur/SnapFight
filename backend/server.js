const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT||3000
const pool = require('./database/db')

app.use(express.json());
app.use(cors());


app.listen(port,() =>{
    console.log(`server is running on port ${port}...`)
})