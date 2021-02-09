const express = require('express');
const router = express.Router();
const { jobposting, listjobs } = require('../controllers/jobPosting')

router.post('/jobcreate', jobposting);
router.get('/alljobs', listjobs)

module.exports = router;