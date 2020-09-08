const express = require('express');
const router = express.Router();
const logout = require('../controllers/logoutController');

/* GET home page. */
router.get('/', logout.logout);
module.exports = router;