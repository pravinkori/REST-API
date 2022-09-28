const startupDebugger = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require("express");
const mongoose = require('mongoose');
const courses = require('./routes/courses');
const customers = require('./routes/customers');
const home = require('./routes/home');

const app = express();

// console.log(`NODE_ENV: ${ process.env.NODE_ENV }`);
// console.log(`app: ${ app.get('env') }`);

// Middleware
app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/customers', customers);
app.use('/', home);
// app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(helmet());

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


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port} 👻`);
})
