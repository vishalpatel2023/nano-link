const express = require('express');
const router = express.Router();

const {createShortUrl, redirectUrl} = require('../controllers/urlController');
const { requireAuth } = require('../middlewares/auth'); // <-- MIDDLEWARE

router.post('/shorten', requireAuth, createShortUrl);

router.get('/:shortCode', redirectUrl);

module.exports = router;
