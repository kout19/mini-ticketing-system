const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const dotenv = require('dotenv');

dotenv.config();

const Auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "thisisminiticket"); // Make sure to use env variables

        console.log("Decoded Token:", decoded);

        // Fetch user from DB
        req.user = await User.findById(decoded._id).select("role email"); // Include role explicitly

        console.log("Fetched User from DB:", req.user);

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

const Admin = (req, res, next) => {
    console.log("Checking Admin Role:", req.user);
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only!' });
    }
    next();
};

module.exports = { Auth, Admin };
