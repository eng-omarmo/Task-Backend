const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the User model based on the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other files
module.exports = User;
