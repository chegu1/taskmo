const asyncHandler = require('express-async-handler');
const JobPosting = require('../models/JobPosting');


exports.jobposting = asyncHandler(async (req, res) => {
    const newJob = req.body;
    console.log(newJob)
    const createJob = await new JobPosting(newJob);
    const saveJobIntoDB = await createJob.save()
    res.status(201).json(saveJobIntoDB)
})

exports.listjobs = asyncHandler(async (req, res) => {
    const jobs = await JobPosting.find({})
    res.json(jobs)
})
