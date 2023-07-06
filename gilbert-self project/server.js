const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let movieLikes = {}; // Store movie likes in memory

// Handle POST request to like a movie
app.post('/like', (req, res) => {
  const { movieId } = req.body;

  if (!movieLikes[movieId]) {
    movieLikes[movieId] = 0;
  }

  movieLikes[movieId]++;

  // Send the updated likes count as the response
  res.json({ likes: movieLikes[movieId] });
});

// Serve the movie recommendation app
app.use(express.static('public'));

const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
