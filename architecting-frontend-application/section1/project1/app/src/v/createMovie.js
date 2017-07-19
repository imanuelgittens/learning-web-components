/*********************************
 ***Methods For Creating Movies**
 * ********************************/

mv.v.createMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('addMovie');
    var saveButton = document.getElementById('addMovie').commit;
    //load all movie objects
    mv.m.Movie.retrieveAll();
    //add event listeners for responsive validation
    formEl.movieNumber.addEventListener('input', function(){
      formEl.movieNumber.setCustomValidity(mv.m.Movie.checkMovieNoAsId(formEl.movieNumber.value).message);
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
    var formEl = document.getElementById('addMovie');
    var slots = {
      movieNo: formEl.movieNumber.value,
      title: formEl.movieTitle.value,
      movieLength: formEl.movieLength.value,
      dateReleased: formEl.movieDateReleased.value
    }
    //set error messages in case of constraint violation
    formEl.movieNumber.setCustomValidity(mv.m.Movie.checkMovieNoAsId(formEl.movieNumber.value).message);
    formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(formEl.movieTitle.value).message);
    formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(formEl.movieLength.value).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(formEl.movieDateReleased.value).message);

    //save changes only if everything is valid
    if(formEl.checkValidity()){
      mv.m.Movie.add(slots);
    }
  }
}