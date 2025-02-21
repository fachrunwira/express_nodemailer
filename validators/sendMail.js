const joi = require('joi');

const validator = joi.object({
  name: joi.string().max(120).required().label('Name').messages({
    'string.max': 'Panjang {#label} maksimal {#limit} karakter',
    'string.empty': '{#label} masih kosong.',
    'string.base': '{#label} masih kosong.',
    'any.required': '{#label} masih kosong.',
  }),
  email: joi.string().email().max(100).required().label('Email').messages({
    'string.max': 'Panjang {#label} maksimal {#limit} karakter',
    'string.empty': '{#label} masih kosong.',
    'string.base': '{#label} masih kosong.',
    'string.email': '{#label} yang dimasukkan invalid.',
    'any.required': '{#label} masih kosong.',
  }),
  subject: joi.string().max(100).required().label('Subject').messages({
    'string.max': 'Panjang {#label} maksimal {#limit} karakter',
    'string.empty': '{#label} masih kosong.',
    'string.base': '{#label} masih kosong.',
    'any.required': '{#label} masih kosong.',
  }),
  message: joi.string().max(1000).required().label('Message').messages({
    'string.max': 'Panjang {#label} maksimal {#limit} karakter',
    'string.empty': '{#label} masih kosong.',
    'string.base': '{#label} masih kosong.',
    'any.required': '{#label} masih kosong.',
  })
});

module.exports = validator;