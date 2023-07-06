document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
  
    // Fetch movie data from the API
    function fetchMovies(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.log('Error:', error));
    }
  
    // Display movies on the page
    const displayMovies = movies => {
      const movieList = document.getElementById('movie-list');
      movieList.innerHTML = ''; // Clear the previous movie list
  
      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieList.appendChild(movieCard);
      });
    };
  
    // Create a movie card element
    const createMovieCard = movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.id = `movie-${movie.id}`;
  
      const title = document.createElement('h3');
      title.textContent = movie.title;
  
      const image = document.createElement('img');
      image.src = IMG_PATH + movie.poster_path;
      image.alt = movie.title;
  
      const likeButton = document.createElement('button');
      likeButton.textContent = 'Like';
      likeButton.addEventListener('click', () => {
        likeMovie(movie.id);
      });
  
      movieCard.appendChild(title);
      movieCard.appendChild(image);
      movieCard.appendChild(likeButton);
  
      movieCard.addEventListener('click', () => {
        fetchMovieDetails(movie.id);
      });
  
      return movieCard;
    };
  
    // Fetch movie details
    const fetchMovieDetails = movieId => {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
      fetch(detailsUrl)
        .then(response => response.json())
        .then(data => displayMovieDetails(data))
        .catch(error => console.log('Error:', error));
    };
  
    // Display movie details
    const displayMovieDetails = movie => {
      const movieInfo = document.getElementById('movie-info');
      movieInfo.innerHTML = '';
  
      const title = document.createElement('h3');
      title.textContent = movie.title;
  
      const overview = document.createElement('p');
      overview.textContent = movie.overview;
  
      movieInfo.appendChild(title);
      movieInfo.appendChild(overview);
    };
  // Like a movie
const likeMovie = movieId => {
    // Send a request to update the movie's likes
    // Replace `<your-api-endpoint>` with the actual endpoint
    fetch('<your-api-endpoint>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ liked: true })
    })
      .then(response => response.json())
      .then(data => {
        // Update movie's likes count on the page
        const movieCard = document.getElementById(`movie-${movieId}`);
        const likeButton = movieCard.querySelector('button');
        likeButton.textContent = `Liked (${data.likes})`;
      })
      .catch(error => console.log('Error:', error));
  };
  
    // Event listener for form submission
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
  
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        const searchURL = SEARCH_API + searchTerm;
        fetchMovies(searchURL);
      }
      searchInput.value = '';
    });
  
    // Event listener for comment form submission
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment');
    const commentsList = document.getElementById('comments');
  
    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const comment = commentInput.value.trim();
      if (comment) {
        addComment(comment);
        commentInput.value = '';
      }
    });
  
    // Add a comment
    const addComment = comment => {
      const commentItem = document.createElement('div');
      commentItem.textContent = comment;
      commentsList.appendChild(commentItem);
    };
  
    // Event listener for page load
    fetchMovies(API_URL);
  });
  
  