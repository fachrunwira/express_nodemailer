const handler = require('express-async-handler');
const mailValidator = require('../validators/sendMail');
const mailer = require('../module/mailer');

const sendMail = handler(async (req, res, next) => {
  return mailValidator.validateAsync(req.body, {abortEarly: true})
  .then(async valid => {
    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: `${valid.name} ${valid.email}`,
      replyTo: process.env.REPLY_TO,
      subject: valid.subject,
      message: valid.message ?? null
    };

    const mailInfo = mailer.sendMail(mailOptions);

    return mailInfo
    .then(mailRes => {
      console.info(mailRes.response);
      return res.status(200).json({
        status: true,
        code: 200,
        message: 'Berhasil mengirim email',
        content: []
      });
    })
    .catch(mailErr => {
      console.error(mailErr)
      return res.status(500).json({
        status: false,
        code: 500,
        message: 'Gagal mengirim email. Mohon coba sekali lagi.',
        errors: null
      });
    })
  })
  .catch(error => {
    return next({
      code: 422,
      message: 'Failed to validate request.',
      errors: error
    });
  })
});

module.exports = {
  sendMail
}