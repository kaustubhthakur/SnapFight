const { pool } = require('../database/db')
const bcrypt = require('bcryptjs')
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hshpassword = await bcrypt.hash(password, 10);
        const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        `
        const values = [username, email, hshpassword];
        const result = await pool.query(query, values);
        return result.rows[0];

    } catch (error) {
        console.error(error)
    }
}
module.exports = { createUser }