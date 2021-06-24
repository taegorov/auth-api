'use strict';

const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');

// === === // Esoteric Resources for API-SERVER // === === //
// const notFoundHandler = require('./api-server/src/error-handlers/404.js');
// const errorHandler = require('./api-server/src/error-handlers/500.js');
const logger = require('./api-server/src/middleware/logger.js');

// === === // Esoteric Resources for AUTH-SERVER // === === //
const errorHandlerAuth = require('./auth-server/src/auth/error-handlers/500.js');
const notFound = require('./auth-server/src/auth/error-handlers/404.js');


const authRoutes = require('./auth-server/src/auth/routes.js');


// === === // api-server handlers/middleware // === === //
const v1Routes = require('./api-server/src/routes/v1.js');
const v2Routes = require('./api-server/src/routes/v2.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// app.use('*', notFoundHandler);
// app.use(errorHandler);


// === === // auth-server handlers/middleware // === === //

app.use(cors());
// app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandlerAuth);



// === === // export // === === //

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
