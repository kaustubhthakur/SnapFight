const jwt = require('jsonwebtoken')
require('dotenv').config();
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAge: 15 * 24 * 60 * 60 * 1000, 
		sameSite: "strict",
	});

	return token;
};
module.exports = generateTokenAndSetCookie;