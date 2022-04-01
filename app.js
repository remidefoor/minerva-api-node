'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const userRouter = require('./routes/userRoutes');
const userBookRouter = require('./routes/userBookRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
