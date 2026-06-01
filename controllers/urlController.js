const Url = require('../models/url');
const generateShortCode = require('../utils/generateShortCode');

const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        let shortCode;

        do {
            shortCode = generateShortCode();
        } while (await Url.findOne({ shortCode }));

        const url = await Url.create({
            originalUrl,
            shortCode
        });

        // res.status(201).json(url);
        res.render('result', {
            shortCode: url.shortCode
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const redirectUrl = async (req, res) => {
    console.log("Trying");
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: 'URL not found'
            });
        }

        console.log("Hello see this: ",url);

        url.clicks += 1;
        await url.save();
        console.log(url);

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