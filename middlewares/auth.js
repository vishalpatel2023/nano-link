const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        // verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // if token is tampered or expired
                return res.redirect('/login');
            } else {
                // Success hehehe Attaching the user's ID to the request
                req.user = decodedToken;
                next();
            }
        });
    } else {
        // No token found (user is not logged in)
        res.redirect('/login');
    }
};

module.exports = { requireAuth };