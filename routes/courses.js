const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Java' },
    { id: 2, name: 'C++' },
    { id: 3, name: 'Python' },
];

// This endpoint is to get all the courses
router.get('/', (req, res) => {
    res.send(courses);
});

// This endpoint is to get single courses by id with the help of Route parameter
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;