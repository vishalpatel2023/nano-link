const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/urlshortener");
        console.log("MongoDB connected");
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports = connectDB;