import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

import User from "./models/User.js";


const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MONGODB Connected`);
    }
};


// POST / signup

app.post('/signup', async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
    });

    try {
        const savedUser = await user.save();

        res.json({
            sucess: true,
            data: savedUser,
            message: "Signup Sucessfully.."
        })
    }
    catch (e) {
        res.json({
            sucess: false,
            message: e.message
        })
    }
})

// POST / login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: true,
            message: "Please provide email and password"
        })
    }
    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")

    if(user){
        return res.json({
            success:true,
            data:user,
            message:"Login Sucessful"
        })
    }else{
        return res.json({
            success:false,
          message:"Invalid credentials"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
    connectDB();
});