const express = require("express");

const app = express();

// Middleware
app.use(express.json());

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
    if(!course) res.status(404).send('The course you\'re looking for was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // Validation logic for name input
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Oops! name should be of minimum 3 chracters.📛');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:course/:id', (req, res) => {
    res.send(req.params)
})

// Query string parameter
app.get('/api/courses/:course/:id', (req, res) => {
    res.send(req.query)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port} 👻`);
})


