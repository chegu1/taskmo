const express = require('express');
const router = express.Router();
const { appliedjoblist, protect, singleJob } = require('../controllers/applied')

router.post('/apply', appliedjoblist);
router.get('/getbyid/:id', singleJob);

module.exports = router;