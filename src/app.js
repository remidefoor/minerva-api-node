const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const createError = require('http-errors');

const app = express();
const userRouter = require('./routes/userRoutes');
const userBookRouter = require('./routes/userBookRoutes');
const noteRouter = require('./routes/noteRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create write stream (append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), { flags: 'a' });
// file logging
app.use(logger('combined', { stream: accessLogStream }));
// console logging
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/users/:userId/books', userBookRouter);
app.use('/api/users/:userId/books/:isbn/notes', noteRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'The requested page does not exist.', { errors: [] }));
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .send(error)
    .end();
});

module.exports = app;
