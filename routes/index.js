const express = require('express');
const router = express.Router();
const mailerController = require('../controllers/mailer');

router.post('/send-mail', mailerController.sendMail);

module.exports = router;
