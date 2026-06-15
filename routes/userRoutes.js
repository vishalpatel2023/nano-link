const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require('../controllers/userController');

// Home page route
router.get('/', (req, res) => {
    return res.render('index');
});

// Register routes
router.get('/register', (req, res) => {
    return res.render('register');
});
router.post('/register', handleUserSignup);

//  Login routes
router.get('/login', (req, res) => {
    return res.render('login'); 
});
router.post('/login', handleUserLogin);
module.exports = router;