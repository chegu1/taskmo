const mongoose = require('mongoose');

const appliedJobs = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    appliedjobs: [

    ]
})

module.exports = mongoose.model('appliedjobs', appliedJobs)