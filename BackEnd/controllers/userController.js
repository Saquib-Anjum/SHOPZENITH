import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//token generation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET );
}
// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        // console.log("_id of the current user " , user._id)
        if (!user) {
            return res.json({
                success: false,
                message: "User does not  exists"
            });
        }
        console.log("_id of the current user ", user._id);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);

            res.json({
                success: true,
                token: token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (err) {
        console.log("Err  :", err)
        res.json({
            success: false,
            message: err.message
        })
    }
};

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Validation
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        // Creating new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Saving user to database
        await newUser.save();
        const token = createToken(newUser._id)
        return res.json({
            success: true,
            token: token,
            message: "User registered successfully",
            user: newUser
        });

    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: "Error registering user",
            error: err.message
        });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                success: true,
                token,
                message: "Yes you are Admin"
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid credinatials"
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.message
        })
    }
};

export { loginUser, registerUser, adminLogin };
