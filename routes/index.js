const express = require('express');
const router = express.Router();
const index = require('../controllers/indexController');

router.get('/', index.render);

module.exports = router;