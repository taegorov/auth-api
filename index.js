'use strict';

require('dotenv').config();


const app = require('./server.js');

const { db } = require('./auth-server/src/auth/models/index.js');


db.sync().then(() => {
  app.start(process.env.PORT || 3000);
});
