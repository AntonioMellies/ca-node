const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const MiddlewareAuthentication = require('../utils/jwt');

router.post('/register', userController.create);
router.get('/', MiddlewareAuthentication ,userController.getAll);
router.get('/:userId', MiddlewareAuthentication , userController.getById);
router.put('/:userId', MiddlewareAuthentication , userController.updateById);
router.delete('/:userId', MiddlewareAuthentication ,userController.deleteById);

module.exports = router;