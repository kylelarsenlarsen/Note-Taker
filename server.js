const note = require('./db/db.sjon');
const fs = require('fs');
const path = require('path');
const express = require('express');

// in the following code i will be setting up the port and calling the express application into in this code.
const app = express();
const PORT = process.env.PORT || 3000;

