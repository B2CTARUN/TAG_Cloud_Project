const express = require('express');
const { executeHandler } = require('../controllers/execute.controller');

const router = express.Router();

router.post('/execute', executeHandler);

module.exports = router;
