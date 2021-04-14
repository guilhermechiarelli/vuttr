const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();

    this.server.listen(3000, () => {
      console.log('Server started!');
    });
  }

  database() {
    mongoose.connect('mongodb://localhost/vuttr', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  routes() {
    this.server.use(require('./routes/index.js'));
  }
}

module.exports = new App().server;
