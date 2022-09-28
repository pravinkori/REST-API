const mongoose = require('mongoose');
const express = require('express');
const Joi = require("joi");
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    isGold: {
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result)
                    }, 4000);
                });
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Customer = mongoose.model('Customer', customerSchema);

// This endpoint is to get all the courses
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(course);
});

// This endpoint is to get single courses by id with the help of Route parameter
router.get('/:id', async (req, res) => {
    const course = await Customer.findById(req.params.id)
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

router.post('/', async (req, res) => {

    // Validation logic for name input
    const { error } = await validateCustomer(req.body);
    if (error) return res.status(400).send(error.details);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Course.findByIdAndUpdate(req.params.id,
        { name: req.body.name },
        { new: true });

    if (!customer) return res.status(404).send('The customer you\'re looking for was not found.');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Course.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer is deleted from database.');

    res.send(customer);
});

// Validation function
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(course);
}

module.exports = router;