const { Pool } = require('pg')
require('dotenv').config();
const pool = new Pool({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: process.env.PG_PASSWORD,
    database: "postgres1"
})
pool.on("connect", () => {
    console.log("connection pool established with db")
})
module.exports = pool