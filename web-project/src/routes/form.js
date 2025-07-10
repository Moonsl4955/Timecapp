const express = require('express');
const FormController = require('../controllers/formController');

const router = express.Router();
const formController = new FormController();

router.post('/submit', formController.saveUserInput);

module.exports = router;