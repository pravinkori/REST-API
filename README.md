# REST API 
## MongoDB and Express.js REST API sample application
Currently, JavaScript is the most popular web development language and is used in millions of websites and services. REST API-based communication between the front-end and back-end tiers is one of the foundational components of the JavaScript stack in many of its versions such as front-end and back-end.
This repository contains the sample application for simple CRUD operation using MongoDB and Express.js 
## How To Run
Clone this repository and get your Connection String to the database. 
Then, set the URI connection parameter in `config/development.json` to your Connection String:
### Installation:
Install the dependencies and devDependencies and start the server.
```
cd REST-API
npm install
npm install -g nodemon
nodemon index.js
```
### For production environments.
```sh
npm install
NODE_ENV=production
```

### Start the Postman 
`Get request`
```sh
http://localhost:3000/api/courses
```
`Post request`
```sh
http://localhost:3000/api/courses
```
`Put request`
```sh
http://localhost:3000/api/courses/[id]
```
`Delete request`
```sh
http://localhost:3000/api/courses/[id]
```

