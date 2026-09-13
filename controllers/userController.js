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

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).render('login', {
                error: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).render('login', {
                error: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        return res.redirect('/');

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).render('login', {
            error: "Something went wrong. Please try again."
        });
    }
}

//Render the Dashboard
// async function renderDashboard(req, res) {
//     try {
//         const userUrls = await Url.find({ createdBy: req.user.id }).sort({ createdAt: -1 });

//         // Pass these URLs 'dashboard.ejs' file
//         return res.render('dashboard', { urls: userUrls });
//     } catch (error) {
//         console.error("Dashboard Error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

//updated render dashboard
async function renderDashboard(req, res) {
    try {
        const userUrls = await Url.find({
            createdBy: req.user.id
        }).sort({
            createdAt: -1
        });
        const totalLinks = userUrls.length;

        const totalClicks = userUrls.reduce(
            (total, url) => total + url.clicks,
            0
        );
        let mostClickedUrl = null;

        if (userUrls.length > 0) {
            mostClickedUrl = userUrls.reduce((max, url) => {
                return url.clicks > max.clicks ? url : max;
            });
        }
        return res.render('dashboard', {
            urls: userUrls,
            totalLinks,
            totalClicks,
            mostClickedUrl
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleDeleteUrl(req, res) {
    try {
        const { id } = req.params;

        await Url.findOneAndDelete({
            _id: id,
            createdBy: req.user.id
        });

        return res.redirect('/dashboard');

    } catch (error) {
        console.error("Delete URL Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function renderAnalytics(req, res) {
    try {
        const { id } = req.params;

        const url = await Url.findOne({
            _id: id,
            createdBy: req.user.id
        });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        return res.render('analytics', {
            url
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    renderDashboard,
    handleDeleteUrl,
    renderAnalytics
};
