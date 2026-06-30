const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {

        const {
            fullName,
            email,
            mobile,
            password,
            referralCodeUsed
        } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { mobile }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        let referredBy = null;

        if (referralCodeUsed) {

            const referrer = await User.findOne({
                referralCode: referralCodeUsed
            });

            if (referrer) {
                referredBy = referrer._id;
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const referralCode =
            "REF" + Date.now();

        const user = await User.create({
            fullName,
            email,
            mobile,
            password: hashedPassword,
            referralCode,
            referredBy
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                referralCode: user.referralCode
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user
    });

};

module.exports = {
    register,
    login,
    getProfile
};