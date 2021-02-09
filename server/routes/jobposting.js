const express = require('express');
const router = express.Router();
const { jobposting } = require('../controllers/jobPosting')

router.post('/jobs', jobposting)

module.exports = router;