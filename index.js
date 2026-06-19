const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

const jwt = require('jsonwebtoken');
const User = require('./models/user');

const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();

connectDB();

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());

// global middleware to pass user data to all EJS views
app.use(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                // email ko DB se nikaalo
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; 
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
});

app.use('/', userRoutes);


// app.get("/",(req,res)=>{
//     // res.send("Home page");
//     res.render('index');
// });


app.use('/api/url', urlRoutes);

app.get('/:shortCode', urlController.redirectUrl);

app.listen(process.env.PORT,()=>{
    console.log(`project is running on ${process.env.PORT} \n`);
});