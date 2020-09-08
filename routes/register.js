const express = require('express');
const router = express.Router();
const register = require('../controllers/registerController');

router.get('/', register.render);
router.post('/', register.createUser);

module.exports = router;