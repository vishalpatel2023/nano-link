const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');


const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

dotenv.config();

connectDB();

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());

app.get("/",(req,res)=>{
    // res.send("Home page");
    res.render('index');
});


app.use('/api/url', urlRoutes);

app.get('/:shortCode', urlController.redirectUrl);

app.listen(process.env.PORT,()=>{
    console.log(`project is running on ${process.env.PORT} \n`);
});