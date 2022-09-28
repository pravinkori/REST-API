const mongoose = require('mongoose');
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
    author: String,
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
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function () { return this.isPublished; }
    }
});

const Course = mongoose.model('Course', courseSchema);

// Validation function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        category: Joi.string().min(3).max(9).required(),
        author: Joi.string().required(),
        tags: Joi.array().min(1).max(3).items(Joi.string()),
        isPublished: Joi.boolean(),
        price: Joi.number().required()
    });
    return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validate = validateCourse;