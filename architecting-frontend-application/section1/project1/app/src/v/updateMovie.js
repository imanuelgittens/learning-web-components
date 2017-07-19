/*********************************
 ***Methods For updating a Movie**
 * ********************************/

mv.v.updateMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('updateMovie');
    var selectEl = formEl.movieSelect;
    var saveButton = formEl.commit;
    var ratingSelectEl = formEl.movieRating;
    var genresSelectEl = formEl.movieGenres;
    //load all movies
    mv.m.Movie.retrieveAll()
    //setup movie selection list
    util.fillSelectWithOptionsFromEntityTable(selectEl, mv.m.Movie.instances, 'movieNo', 'title');


    //when a movies is selected, populate the fields with that movie's data
    selectEl.addEventListener('change', function(){
      var movie = null;
      var key = selectEl.value;
      if(key) {
        movie = mv.m.Movie.instances[key];
        formEl.movieNo.value = movie.movieNo;
        formEl.movieTitle.value = movie.title;
        formEl.movieLength.value = movie.movieLength;
        formEl.movieDateReleased.value = movie.dateReleased;
        // populate the selection list for the rating enum attribute
        util.fillSelectWithOptionsFromEnumLabels(ratingSelectEl, mv.m.MovieRatingEL.labels);
        /* populate the multi-selection list for genres, which
         is mandatory, so there's no need for an unselect event listener */
        util.fillMultiSelectWithOptionsFromEnumLabels(genresSelectEl, mv.m.GenreEl.labels, movie.genres);



        formEl.movieTitle.setCustomValidity('');
        formEl.movieLength.setCustomValidity('');
        formEl.movieDateReleased.setCustomValidity('');


      }else{
        formEl.reset();
      }

    });
    //add event listeners for responsive validation
    formEl.movieTitle.addEventListener('input', function(){
      formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(formEl.movieTitle.value).message);
      console.log(formEl.checkValidity())
    });
    formEl.movieLength.addEventListener('input', function(){
      formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(formEl.movieLength.value).message);
      console.log(formEl.checkValidity())
    });
    formEl.movieDateReleased.addEventListener('input', function(){
      formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(formEl.movieDateReleased.value).message);
    });
    //set a click event handler for the save button
    saveButton.addEventListener('click', mv.v.updateMovie.handleSaveButtonClickEvent);
    // neutralize the submit event
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      formEl.reset();
    });
    //setup event handler for when the browser/window is closed
    window.addEventListener('beforeunload', mv.m.Movie.saveAll);
  },
  //save data
  handleSaveButtonClickEvent: function() {
    var i;
    var formEl = document.getElementById('addMovie');
    var selectedGenres = formEl.movieGenres.selectedOptions;
    var slots = {
      movieNo: formEl.movieNo.value,
      title: formEl.movieTitle.value,
      movieLength: formEl.movieLength.value,
      dateReleased: formEl.movieDateReleased.value,
      rating: formEl.movieRating.value,
      genres: []
    }
    // construct the list of selected genres
    for (i = 0; i < selectedGenres.length; i++) {
      slots.genres.push(
        parseInt(selectedGenres[i].value));
    }

    //set error messages in case of constraint violation
    formEl.movieNo.setCustomValidity(mv.m.Movie.checkMovieNoAsId(slots.movieNo).message);
    formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(slots.title).message);
    formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(slots.movieLength).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(slots.dateReleased).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkRating(slots.rating).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkGenres(slots.genres).message);

    //save changes only if everything is valid
    if (formEl.checkValidity()) {
      mv.m.Movie.add(slots);
    }
  }
}