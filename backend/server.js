const express = require('express')
const cors = require('cors')
const app = express();
const port = 9000;






app.listen(port,() =>{
    console.log(`server is running on port ${port}...`)
})