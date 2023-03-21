const router = require('express').Router();
const indexController = require('../controllers/indexController');


router.get(['/', '/index'], indexController.loadIndex);

module.exports = router;