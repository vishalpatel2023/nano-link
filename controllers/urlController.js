const Url = require('../models/url');
const generateShortCode = require('../utils/generateShortCode');

const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = generateShortCode();

        const url = await Url.create({
            originalUrl,
            shortCode
        });

        res.status(201).json(url);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: 'URL not found'
            });
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createShortUrl,
    redirectUrl
};