/*********************************
 ***Methods For updating a Movie**
 * ********************************/

mv.v.updateMovie = {
  setupUserInterface: function(){
    var formEl = document.getElementById('updateMovie');
    var selectEl = formEl.movieSelect;
    var saveButton = formEl.commit;
    //load all movies
    mv.m.Movie.retrieveAll();
    //setup movie selection list
    util.fillSelectWithOptions(mv.m.Movie.instances, selectEl, 'movieNo', 'title');


    //when a movies is selected, populate the fields with that movie's data
    selectEl.addEventListener('change', function(){
      var movie = null;
      var key = selectEl.value;
      if(key) {
        movie = mv.m.Movie.instances[key];
        formEl.movieNumber.value = movie.movieNo;
        formEl.movieTitle.value = movie.title;
        formEl.movieLength.value = movie.movieLength;
        formEl.movieDateReleased.value = movie.dateReleased;

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
  handleSaveButtonClickEvent: function(){
    var formEl = document.getElementById('updateMovie');
    var slots = {
      movieNo: parseInt(formEl.movieNumber.value),
      title: formEl.movieTitle.value,
      movieLength: formEl.movieLength.value,
      dateReleased: formEl.movieDateReleased.value
    }
    //set error messages in case of constraint violation
    formEl.movieTitle.setCustomValidity(mv.m.Movie.checkTitle(formEl.movieTitle.value).message);
    formEl.movieLength.setCustomValidity(mv.m.Movie.checkMovieLength(formEl.movieLength.value).message);
    formEl.movieDateReleased.setCustomValidity(mv.m.Movie.checkDateReleased(formEl.movieDateReleased.value).message);

    //save changes only if everything is valid
    if(formEl.checkValidity()){
      mv.m.Movie.update(slots);
    }
  }
}