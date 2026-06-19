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

        // bug to fix? if same url exist in database just return it from there do not create new shortcode
        const existingUrl = await Url.findOne({ originalUrl });
        
        if (existingUrl) {
            // If it exists, skip creation and render the existing shortcode immediately
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
        await url.save();
        //console.log(url);

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