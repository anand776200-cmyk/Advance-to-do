const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

router.get('/signIn', async (req, res) => {
    res.render('signInForm')
})
router.get('/logIn', async (req, res) => {
    res.render('loginForm')
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.post('/signIn', async (req, res) => {

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        req.flash('error', "Email is already registered");
        res.redirect('/signIn');
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    req.flash('success', 'You are now registered');
    res.redirect('/logIn');
})

router.post('/logIn', async (req, res) => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
        req.flash('error', 'Email or Password is incorrect. Try Again!!!!');
        return res.redirect('/login');
    }
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
        req.flash('error', 'Email or Password is incorrect. Try Again!!!!');
        return res.redirect('/login');
    }

    req.flash('success', 'Congrats!!! You are logged in');
    req.session.userId = isUser._id;
    res.redirect('/');
})

module.exports = router;