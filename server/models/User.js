const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);