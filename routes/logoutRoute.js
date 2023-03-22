const logoutController = require('../controllers/logoutController');
const router = require('express').Router();

router.get('/logout', logoutController.logout);

module.exports = router;