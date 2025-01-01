// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');

// Start up an instance of app
const port = 8000;
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const listening = console.log(`running on localhost: ${port}`);
const server = app.listen(port, listening);

// Callback to debug
console.log(`running on localhost: ${port}`);   

// Initialize all route with a callback function 
let projectData = {};       
app.get('/all', (req, res) => {
    res.send(projectData);
});
// Post Route
// I am supposed to add it with a key in the post function
app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.userResponse,
    }
    res.send(projectData);
});  