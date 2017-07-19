/*********************************
 ***Methods For Retrieving and Listing all Movies**
 * ********************************/

mv.v.retrieveAndListAllMovies = {
  setupUserInterface: function(){
    var tableBodyEl = document.querySelector('#allMovies > tbody');
    var keys;
    var key = '';
    var row = {};
    var i;
    var movie = null;
    //load all movie objects
    mv.m.Movie.retrieveAll();
    keys = Object.keys(mv.m.Movie.instances);
    //for each movie, create a table row with a cell for each attribute
    for(i = 0; i < keys.length; i++){
      key = keys[i];
      movie = mv.m.Movie.instances[key];

      console.log(movie)
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = movie.movieNo;
      row.insertCell(-1).textContent = movie.title;
      row.insertCell(-1).textContent = movie.movieLength;
      row.insertCell(-1).textContent = movie.dateReleased;
      row.insertCell(-1).textContent = mv.m.MovieRatingEL.labels[movie.rating - 1];
      row.insertCell(-1).textContent = mv.m.GenreEl.enumIndexesToNames( movie.genres);
    }
  }
}