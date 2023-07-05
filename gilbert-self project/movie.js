document.addEventListener('DOMContentLoaded',()=>{
    // fetch movie data from the API
    function fetchMovies() {
        fetch('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',)
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.log('Error:',error));
        
    } 
    // Display movies on the page
    const displayMovies = (movies) => {
        const movieList = document.getElementById('movie-list');

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieList.appendChild(movieCard);
            
        });
     }
    // create a movie card element
    const createMovieCard =(movie) =>{
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card')
        movieCard.id = `movie-${movie.id}`

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const image = document.createElement('img');
        image.src = movie.image;
        image.alt = movie.title;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'like';
        likeButton.addEventListener('click',()=>{
            likeMovie(movie.id);
        });
        movieCard.appendChild(title);
        movieCard.appendChild(image);
        movieCard.appendChild(likeButton);

        return movieCard;

    }

    //  like a movie
    const likeMovie = (movieId)=>{
        // send a request to update the movie's likes
        fetch('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup/${movieId}/like',{
            method:'post',
            Headers: {
                'content-type':'application/json'

            },
            body:JSON.stringify({liked:true})
        })
        .then(response=>response.json())
        .then(data=>{
            // update movies likes count on the page
            const movieCard = document.getElementById(`movie-${movieId}`);
            const likeButton = movieCard.querySelector('button');
            likeButton.textContent=`Liked (${data.likes})`;  
        })
        .catch(error=>console.log('Error:',error));
    }
    // event listner for page load
    fetchMovies();
    });