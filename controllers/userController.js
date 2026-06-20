const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Url = require('../models/url');

// Handle User Registration
async function handleUserSignup(req, res) {
    const { fullname, email, password, confirm_password } = req.body;

    try {
        if (password !== confirm_password) {
            return res.status(400).send("Passwords do not match.");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email is already registered.");
        }

        // Hashing the password for security
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the new user
        await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        // Successfully registered now Redirect to the login page
        return res.redirect('/login');

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

// Handle User Login
async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    console.log("Form Submitted Email:", email);
    console.log("Form Submitted Password:", password);

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).send("Invalid email or password.");
        }

        //token containing the user's ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '3d' // expires in 3 days
        });

        // Send the token in a cookie
        res.cookie('jwt', token, { 
            httpOnly: true, 
            maxAge: 3 * 24 * 60 * 60 * 1000 //in milleisecond
        });

        //Success! hahaha send them to the homepage.
        return res.redirect('/');

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

//Render the Dashboard
async function renderDashboard(req, res) {
    try {
        const userUrls = await Url.find({ createdBy: req.user.id }).sort({ createdAt: -1 });

        // Pass these URLs 'dashboard.ejs' file
        return res.render('dashboard', { urls: userUrls });
    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    renderDashboard
};
