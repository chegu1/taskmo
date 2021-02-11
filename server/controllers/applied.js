const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Applied = require('../models/AppliedJob');
const Jobs = require('../models/JobPosting')
const jwt = require('jsonwebtoken')

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, 'EREUuiue*120&^%^')
            req.user = await User.findById(decoded.id)
            next()
        } catch (e) {
            console.error(e)
            res.status(401)
            throw new Error('Not Authorized token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    // next()
})

exports.appliedjoblist = asyncHandler(async (req, res) => {
    console.log(req.body.appliedlist)
    // const jobdetail = await Jobs.findOne({ _id: req.body.id }).exec((item) => {
    //     console.log(item, "item")
    // })
    await new Applied({ appliedjobs: req.body.appliedlist, user: req.body._id }).save()
})

exports.singleJob = asyncHandler(async (req, res) => {
    const getJobById = await Jobs.findById(req.params.id);
    return res.json({ getJobById })
})