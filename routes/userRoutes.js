const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const { handleUserSignup, handleUserLogin, renderDashboard, handleDeleteUrl, renderAnalytics } = require('../controllers/userController');
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
    res.render('login', {
        error: null
    });
});

//logout route
router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); //deletes cookie instantly ╰(*°▽°*)╯
    res.redirect('/');
});

router.get('/dashboard', requireAuth, renderDashboard);

router.post('/login', handleUserLogin);
router.post('/delete/:id', requireAuth, handleDeleteUrl);
router.get('/analytics/:id', requireAuth, renderAnalytics);

module.exports = router;