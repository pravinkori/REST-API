const mongoose = require('mongoose');
const Joi = require("joi");

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
    date: {
        type: Date,
        default: Date.now
    },
});

const Customer = mongoose.model('Customer', customerSchema);

// Validation function
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(course);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;