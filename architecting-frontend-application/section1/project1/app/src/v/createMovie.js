/*********************************
 ***Methods For Creating Movies**
 * ********************************/

mv.v.createMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addMovie');
    var saveButton = document.getElementById('addMovie').commit;
    var ratingSelectEl = formEl.movieRating;
    var genresSelectEl = formEl.movieGenres;
    // set up selection lists for enum attributes
    util.fillSelectWithOptionsFromEnumLabels(ratingSelectEl, mv.m.MovieRatingEL.labels);
    util.fillSelectWithOptionsFromEnumLabels(genresSelectEl, mv.m.GenreEl.labels);

    //load all movie objects
    mv.m.Movie.retrieveAll();
    //add event listeners for responsive validation
    formEl.movieNo.addEventListener('input', function(){
      formEl.movieNo.setCustomValidity(mv.m.Movie.checkMovieNoAsId(formEl.movieNo.value).message);
    });
    formEl.movieTitle.addEventListener('input', function(){
      formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(formEl.movieTitle.value).message);
    });
    formEl.movieLength.addEventListener('input', function(){
      formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(formEl.movieLength.value).message);
    });
    formEl.movieDateReleased.addEventListener('input', function(){
      formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(formEl.movieDateReleased.value).message);
    });
    // check mandatory value constraint for multiple selection list
    genresSelectEl.addEventListener("change", function () {
      genresSelectEl.setCustomValidity(
        (genresSelectEl.selectedOptions.length === 0) ? "A value must be selected!":"" );
    });
    //set a click handler for the save button
    saveButton.addEventListener('click', mv.v.createMovie.handleSaveButtonClickEvent);
    //prevent default form submission
    formEl.addEventListener('submit', function(event){
      event.preventDefault();
      formEl.reset();
    })
    //set event handler for when the browser/window is closed
    window.addEventListener('beforeunload', function(){
      mv.m.Movie.saveAll();
    });
  },
  handleSaveButtonClickEvent: function(){
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
    for (i=0; i < selectedGenres.length; i++) {
      slots.genres.push(
        parseInt( selectedGenres[i].value));
    }

    //set error messages in case of constraint violation
    formEl.movieNo.setCustomValidity(mv.m.Movie.checkMovieNoAsId(slots.movieNo).message);
    formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(slots.title).message);
    formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(slots.movieLength).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(slots.dateReleased).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkRating(slots.rating).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkGenres(slots.genres).message);

    //save changes only if everything is valid
    if(formEl.checkValidity()){
      mv.m.Movie.add(slots);
    }
  }
}