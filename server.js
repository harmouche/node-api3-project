const express = require('express');
const server = express();

const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const helmet = require('helmet');
const morgan = require('morgan');

server.use(express.json());

server.use(helmet());
server.use(morgan('dev'));
server.use(logger)

server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware..!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} [${new Date().toISOString()}]`);
  next();
}

function errorHandler(error, req, res, next) {
  console.log("Error in errorHandler", error.message);
  const code = error.status || error.statusCode || 400;
  res.status(code).json(error);
};

server.use(errorHandler);

module.exports = server;
