const express = require('express');
const router = express.Router();
const { signup, accountActivation } = require('../controllers/auth')

router.post('/signup', signup);
router.post('/account-activation', accountActivation)

module.exports = router;