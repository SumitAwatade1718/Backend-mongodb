const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const User = require('./models/User');

const server = express();
server.use(cors());
server.use(bodyparser.json());


mongoose.connect('mongodb+srv://Sandy:Sandy%40123@leadsoft.x5geh2d.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft')
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Database connection error:", err));


server.post('/register', async (req, res) => {
    try {
        const { fullName, userName, age, password } = req.body;

        
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.json({
                status: false,
                message: 'User already exists'
            });
        }

        // Save new user
        const userobj = new User({ fullName, userName, age, password });
        await userobj.save();

        res.json({
            status: true,
            message: 'User registered successfully'
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message || err
        });
    }
});

//  Login route
server.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ userName });
        if (!userExist) {
            return res.json({
                status: false,
                message: 'User not found'
            });
        }

        // Check password 
        if (password !== userExist.password) {
            return res.json({
                status: false,
                message: 'Incorrect password'
            });
        }

       
        res.json({
            status: true,
            message: 'Login successful'
        });

    } catch (err) {
        res.json({
            status: false,
            message: err.message || err
        });
    }
});

// Start server
server.listen(8085, () => {
    console.log("Server started at port 8085");
});
module.exports = server;
