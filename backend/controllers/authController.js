const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
    try {
        const {name, email, password, profileImageUrl, bio, adminAccessToken } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Determine if the user is an admin based on the provided token
        let role = "member";
        if(
            adminAccessToken && 
            adminAccessToken === process.env.ADMIN_ACCESS_TOKEN
        ) {
            role = "admin";
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            bio,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            bio: user.bio,
            role: user.role,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passowrd
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Return user data and JWT token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT token )

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,           
    loginUser,
    getUserProfile,
};
