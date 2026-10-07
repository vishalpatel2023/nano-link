const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
        },
        password: {
            type: String,
            required: true,
            minlength: [5, 'Password must be at least 5 characters.'],
        },
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model("User", userSchema);