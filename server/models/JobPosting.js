const mongoose = require('mongoose');

const jobPosting = new mongoose.Schema({
    jobtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    expirydate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true })

module.exports = mongoose.model('jobPosting', jobPosting)