const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  res.send(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const requestedId = req.params.imdbID;
  const movie = movieModel[requestedId];
  if (movie) {
    res.send(movie);
  } else {
    res.sendStatus(404);
  }
})

app.put('/movies/:imdbID', function (req, res) {
  const requestedId = req.params.imdbID;
  const incomingMovieData = req.body;

  if (movieModel[requestedId]) {
    movieModel[requestedId] = incomingMovieData;
    res.sendStatus(200);
  } else {
    movieModel[requestedId] = incomingMovieData;
    res.status(201).send(incomingMovieData);
  }
});
app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

