const express = require('express');
const router = express.Router();
const primers = require('../controllers/primers/primers');

router.get('/:id/', primers.primers);

module.exports = router;
