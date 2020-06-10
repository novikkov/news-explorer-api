require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const { limiter } = require('./security/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, SERVER_CONNECT } = require('./config');
const { centrError } = require('./errors/centr-error');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(limiter);

mongoose.connect(SERVER_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(centrError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
