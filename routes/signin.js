const express = require('express');
const router = express.Router();
const signin = require('../controllers/signinController');

router.get('/', signin.render);
router.post('/', signin.signin);

module.exports = router;