const express = require('express');
const router = express.Router();
const image = require('../controllers/imageController');

router.get('/', image.render);
router.post('/', image.checkImage);

module.exports = router;