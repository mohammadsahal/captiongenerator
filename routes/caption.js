const express = require('express');
const router = express.Router();
const caption = require('../controllers/captionController');

router.get('/', caption.render);
router.post('/', caption.addCaption);

module.exports = router;