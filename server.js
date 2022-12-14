const noteValue = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const express = require('express');

// in the following code i will be setting up the port and calling the express application into in this code.
const app = express();
const PORT = process.env.PORT || 3000;

// setting the express application to handling our data parsing.
app.use(express.json()); // telling express to read in json.
app.use(express.urlencoded({ extended: true })); // allows us to access the querystring library which provides a way of parsing the URL query string.

// i need to allow my server.js file to access the public folder to retrieve html, css, and js from that folder.
app.use(express.static('public')); // app.use is used to mount the specified middleware functions at the path which it's being specified.

// in the following i need to retrieve the files and direct them to the correct destination.
app.get('/api/notes', (req, res) => { // we're essentially telling express to retrieve that delcared pathway.
    res.json(noteValue); // note.slice is meant to prevent an undefined error on the saved files column.
});
app.get('/', (req, res) => { // setting up the index in this route.
    res.sendFile(path.join(__dirname, './public/index.html')) // __dirname is used to return the directory path of the current module.
});
app.get('/notes', (req, res) => { // this is an express route to create the /notes directory on our URL then send us to the notes.html file.
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// in the following section i need a function to create a note and assign an id so we can delete it later.
function newNote(body, notesArray) {
    const note = body;
    note.id = notesArray.length+1;
   
    console.log('note', note);
    console.log('notesArray', notesArray);
    notesArray.push(note);
    console.log('notesArray', notesArray);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray) // in the case that the note is saveable we'll put it in our db.json file. we've set our value as the array, replacer as null, and the space is set in the 3rd position.
    );
    return note;
};

// need to create a route to post the generated note.
app.post('/api/notes', (req, res) => {
    console.log('noteValue', noteValue);
    const scribe = newNote(req.body, noteValue);
    res.json(scribe);
});

// in the following section i need a function to delete notes.
function removeNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let script = notesArray[i];
        if (script.id == id) {
            notesArray.splice(i, 1);

            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
};

// i need a delete route method.
app.delete('/api/notes/:id', (req, res) => {
    removeNote(req.params.id, noteValue);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
});