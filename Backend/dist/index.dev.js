"use strict";

var express = require('express');

var verifyUser = require('./middlewares/verifyUser');

var userRouter = require('./routers/user');

var todoRouter = require('./routers/todo');

var cors = require('cors');

var app = express();
var port = 5000;

require('./db_connection'); // to connect the database


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(function (req, res, next) {
  next();
});
app.use('/api/user', userRouter);
app.use('/api/todo', verifyUser, todoRouter);
app.get('/*', function (req, res) {
  console.log("reeq", req);
  res.status(400).send(' <h1>404 not found </h1>');
}); // err handller

app.use(function (err, req, res, next) {
  console.log("status bl");
  res.status(400).json('status bloked');
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});