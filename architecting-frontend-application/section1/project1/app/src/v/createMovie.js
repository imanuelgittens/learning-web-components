/*********************************
 ***Methods For Creating Movies**
 * ********************************/

mv.v.createMovie = {
  setupUserInterface: function(){
    var saveButton = document.getElementById('addMovie').commit;
    //load all movie objects
    mv.m.Movie.retrieveAll();
    //set a click handler for the save button
    saveButton.addEventListener('click', mv.v.createMovie.handleSaveButtonClickEvent)
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
    mv.m.Movie.add(slots);
    formEl.reset();
  }
}