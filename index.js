const morgan = require('morgan');
const helmet = require('helmet');
const express = require("express");
const Joi = require("joi");
const logger = require('./logger');
const authenticator = require('./authenticator');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// HTTP request logger middleware
app.use(morgan('tiny'));

app.use(logger);

app.use(authenticator);

// app.use(function (req, res, next) {
//     console.log("Authenticating...");
//     next();
// })

const courses = [
    {id: 1, name: 'Java'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'Python'},
];

app.get('/', (req, res) => {
    res.send("Hello World!!");
});

// This endpoint is to get all the courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// This endpoint is to get single courses by id with the help of Route parameter
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const result = schema.validate(req.body);
    // console.log(result);
    // 
    // if(result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // Validation logic for name input
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const result = schema.validate(req.body);

    // const result = validateCourse(req.body);

    // Object destructuring. Following line is equivalent to "result.error"
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

// Validation function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

// Query string parameter
app.get('/api/courses/:course/:id', (req, res) => {
    res.send(req.query)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port} 👻`);
})


