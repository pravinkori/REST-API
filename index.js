const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!!");
});

// This endpoint is to get all the courses
app.get('/api/courses', (req, res) => {
    res.send(["Java", "JavaScript", "Python"]);
});

// This endpoint is to get single courses by id with the help of Route parameter
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
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


