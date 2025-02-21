require('dotenv').config;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mailer = require('./module/mailer');
const cors = require('cors');
const fs = require('node:fs/promises');

const indexRouter = require('./routes/index');

const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    code: 404,
    message: 'api route not found.',
    errors: null
  });
});

app.use((err, req, res, next) => {
  fs.appendFile('./log/log', JSON.stringify(err.errors), {flag: "+a"}).then(() => {}).catch(err => {
    console.error(err);
  });

  return res.status(err.code).json({
    status: false,
    code: err.code,
    message: err.message,
    errors: err.errors
  });
});

module.exports = app;
