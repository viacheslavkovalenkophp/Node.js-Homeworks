const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router.get('/', pagesController.getHomePage);
router.get('/page', pagesController.getSecondPage);

module.exports = router;