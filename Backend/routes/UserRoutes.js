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
        } else {
            res.status(200).send('Login successful');
            // Generate a jwt token for session management.
            const token = jwt.sign({ id: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                 if (err) {
                 return res.status(500).json({ error: 'Error generating token' });
                 }
            res.cookie('token', token, { httpOnly: true , secure: false , sameSite: 'lax' , path: '/' }).json({ id: user._id, username: user.username });
      });
        }
    } catch (error) {
        res.status(500).send('Error logging in user');
    }
});




module.exports = router;