const User = require('../models/user');
const bcrypt = require('bcrypt');

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

        // Successfully registered now Redirect them to the login page
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

        // 3. Success! hahaha send them to the homepage.
        return res.redirect('/');

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
