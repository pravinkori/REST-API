const mongoose = require('mongoose');
const express = require('express');
const {Customer, validate} = require('../models/customers')
const router = express.Router();


// This endpoint is to get all the courses
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// This endpoint is to get single courses by id with the help of Route parameter
router.get('/:id', async (req, res) => {
    const course = await Customer.findById(req.params.id)
    if (!course) return res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

router.post('/', async (req, res) => {

    // Validation logic for name input
    const { error } = await validate(req.body);
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
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { name: req.body.name },
        { new: true });

    if (!customer) return res.status(404).send('The customer you\'re looking for was not found.');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer is deleted from database.');

    res.send(customer);
});


module.exports = router;