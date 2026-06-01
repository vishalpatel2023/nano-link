const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const urlRoutes = require('./routes/urlRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
});

app.use('/api/url', urlRoutes);

// take a url from fronted--> map it to a short variable name


app.listen(process.env.PORT,()=>{
    console.log("project is running on port 4000\n");
});