// index.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

const pets = require('./data');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/pets', (req, res) => {
    res.json(pets);
});

app.get('/api/v1/pets/owner', (req, res) => {
    const owner = req.query.owner;
    const pet = pets.find(pet => pet.owner === owner);

    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({ error: 'Pet not found' });
    }
});

app.get('/api/v1/pets/:name', (req, res) => {
    const name = req.params.name;
    const pet = pets.find(pet => pet.name === name);

    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({ error: 'Pet not found' });
    }
});

// Catch-all route to handle unknown routes and serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
