const express = require('express');
const User = require ('../Models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, 
            password: bcrypt.hashSync(password, 10)}); //Hashing the password
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {        
        res.status(500).send(error);
        console.error(error);
    }
});

//Login User
router.post('/login',async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });   // Find user by username
        if (!user) {
            return res.status(400).send('Invalid username or password'); // User not found
        }

        const isValid = bcrypt.compareSync(password, user.password); // Compare passwords
        if (!isValid) {
            return res.status(400).send('Invalid username or password'); // Invalid password
        }

            // Generate a jwt token for session management.
        try {
            const token = jwt.sign(
                { id: user._id.toString(), username: user.username }, 
                process.env.JWT_SECRET, 
                { expiresIn: '24h' }
            );

            res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/' }); // Set token in httpOnly cookie
            res.json({ id: user._id, username: user.username });
        } catch (err) {
           res.status(500).json('Token generation failed');
        }
    } catch (error) {
        res.status(500).send('Error logging in user');
    }}
);

//Profile route (protected)
router.get('/profile', (req, res) => {
    const token = req.cookies.token;   // Get token from cookies
    if (!token) {
        return res.status(401).send('Access denied'); // No token provided
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        res.json({ info: user }); // Send user data
    } catch (error) {
        res.status(401).send('Invalid token');  // Invalid token
    }
});

// update User Profile (protected)

// delete User (protected)

//LogOut User
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' }).send('User logged out successfully');
});


module.exports = router;