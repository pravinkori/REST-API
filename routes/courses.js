const {Course, validate} = require('../models/courses')
const express = require('express');
const router = express.Router();


// This endpoint is to get all the courses
router.get('/', async(req, res) => {
    const course = await Course.find().sort('name');
    res.send(course);
});

// This endpoint is to get single courses by id with the help of Route parameter
router.get('/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

router.post('/', async  (req, res) => {

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
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details);

    let course = new Course({
        name: req.body.name,
        category: req.body.category,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    });
    course = await course.save();
    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, 
        { new: true });
    
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const result = schema.validate(req.body);

    // const result = validateCourse(req.body);

    // Object destructuring. Following line is equivalent to "result.error"

    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');

    res.send(course);
});

module.exports = router;