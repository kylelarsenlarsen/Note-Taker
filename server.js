const note = require('./db/db.sjon');
const fs = require('fs');
const path = require('path');
const express = require('express');

// in the following code i will be setting up the port and calling the express application into in this code.
const app = express();
const PORT = process.env.PORT || 3000;

// setting the express application to handling our data parsing.
app.use(express.json()); // telling express to read in json.
app.use(express.urlencoded({extended: true})); // allows us to access the querystring library which provides a way of parsing the URL query string.

// i need to allow my server.js file to access the public folder to retrieve html, css, and js from that folder.
app.use(express.static('public'));