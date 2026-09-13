const Url = require('../models/url');
const generateShortCode = require('../utils/generateShortCode');

const {isValidUrl} = require('../utils/isValidUrl');

const createShortUrl = async (req, res) => {
    try {
        let { originalUrl } = req.body;

        originalUrl = isValidUrl(originalUrl);

        if(!originalUrl){
            return res.status(400).json({ 
                error: "Invalid URL provided. Please enter a valid website." 
            });
        }

        console.log("Updated URL: ",originalUrl);

        // if same url exist in database just return it from there do not create new shortcode
        const existingUrl = await Url.findOne({ originalUrl });
        
        if (existingUrl) {
            return res.render('result', {
                shortCode: existingUrl.shortCode
            });
        }

        let shortCode;

        do {
            shortCode = generateShortCode();
        } while (await Url.findOne({ shortCode }));

        console.log("Updated URL: ",shortCode);

        const url = await Url.create({
            originalUrl,
            shortCode,
            createdBy: req.user.id
        });

        // res.status(201).json(url);
        // console.log("ese dekhoooo: ",url.shortCode);
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

        //console.log("SHort code is: ",shortCode);

        const url = await Url.findOne({ shortCode });

        //debugging 
        //console.log("Here url is: ",url);

        if (!url) {
            return res.status(404).json({
                message: 'URL not found Hmmm'
            });
        }

        //console.log("Hello see this: ",url);

        url.clicks += 1;
        if (!url.clickHistory) {
            url.clickHistory = [];
        }
        // Get browser information
        const userAgent = req.get('user-agent') || '';

        let browser = 'Unknown';

        if (userAgent.includes('Edg')) {
            browser = 'Edge';
        } else if (userAgent.includes('Chrome')) {
            browser = 'Chrome';
        } else if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
        } else if (userAgent.includes('Safari')) {
            browser = 'Safari';
        }

        // Get referrer domain
        const referer = req.get('referer');

        let referrer = 'Direct';

        if (referer) {
            try {
                const referrerUrl = new URL(referer);
                referrer = referrerUrl.hostname;
            } catch (error) {
                referrer = 'Unknown';
            }
        }

        // Store click information
        url.clickHistory.push({
            browser,
            referrer
        });


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