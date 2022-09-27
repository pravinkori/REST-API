const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require("express");
// const Joi = require("joi");
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authenticator = require('./middleware/authenticator');

const app = express();

// console.log(`NODE_ENV: ${ process.env.NODE_ENV }`);
// console.log(`app: ${ app.get('env') }`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration of environment
console.log(`Application Name: ${ config.get('name') }`);
console.log(`Mail Server: ${ config.get('mail.host') }`);
// console.log(`Mail Server Password: ${ config.get('mail.password') }`);

if (app.get('env') === 'development') {
// HTTP request logger middleware
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
    // console.log('Morgan enabled...');
}

mongoose.connect(`${config.get('database')}`)
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

dbDebugger('Connectd to the database...');

app.use(logger);

app.use(authenticator);

// app.use(function (req, res, next) {
//     console.log("Authenticating...");
//     next();
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port} 👻`);
})
