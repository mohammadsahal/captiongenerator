const express = require('express');
const router = express.Router();
const searchedHash = require('../controllers/searchedHashController');

router.post('/', searchedHash.searchedHash);
module.exports = router;