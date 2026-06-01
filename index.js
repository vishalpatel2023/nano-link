const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
});

// take a url from fronted--> map it to a short variable name


app.listen(4000,()=>{
    console.log("project is running on port 4000\n");
});