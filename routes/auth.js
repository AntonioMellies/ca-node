const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

router.post('/authenticate', userController.authenticate);

module.exports = router;