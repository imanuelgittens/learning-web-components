/*
* @file overwiew: Contains definition of model class Movie
* @author: Imanuel Gittens
* */

/*
* @Class
* */

mv.m.Movie = function(slots){
  this.movieNo = slots.movieNo;
  this.title = slots.title;
  this.movieLength = slots.movieLength;
  this.dateReleased = slots.dateReleased;
}

/******************************************
 ******Class level (static) Properties*****
 * ***************************************/

//initially an empty collection in the form of a map

mv.m.Movie.instances = {};

/******************************************
 *******Class level (static) Methods*******
 ******************************************/

/*convert movie records to movie objects.
 * @method
 * */

mv.m.Movie.convertRecToObj = function(movieRec){
  return new mv.m.Movie(movieRec);
}

/*Retrieve all movie records from local storage
*@method
 */
mv.m.Movie.retrieveAll = function(){
  var key = '';
  var keys = [];
  var moviesString = '';
  var movies = {};
  var i = 0;
  //console.log(localStorage['movies']);
  try{
    if(localStorage['movies']){
      moviesString = localStorage['movies'];
    }
  }catch(e){
    alert('Error when reading from local storage: ' + e);
  }
  if(moviesString){ //if there is data in the movie string
    movies = JSON.parse(moviesString);
    keys = Object.keys(movies);
    //console.log(key.length + ' movies added!');
    for(i = 0; i < keys.length; i++){
      key = keys[i];
      mv.m.Movie.instances[key] = mv.m.Movie.convertRecToObj(movies[key]);
    }
  }
}

/*Save all movie records to local storage
* @method
* */

mv.m.Movie.saveAll = function(){
  var moviesString = '';
  var error = false;
  var numMovies = Object.keys(mv.m.Movie.instances).length;
  try{
    moviesString = JSON.stringify(mv.m.Movie.instances);
    localStorage.setItem('movies', moviesString);
  }catch(e){
    console.log('Error when writing to local storage: ' + e);
    error = true;
  }
  if(error === false){
    console.log(numMovies + ' movies saved!');
  }
}

/*create a new movie and add it to the movie instances collection
* @method
* */

mv.m.Movie.add = function(slots){
  mv.m.Movie.instances[String(slots.movieNo)] = new mv.m.Movie(slots);
  console.log('Movie number ' + slots.movieNo + ' was created!');
}

/*Update an existing movie record
 * @method
 * */

mv.m.Movie.update = function(slots){
  //retrieve movies from main memory database
  var movie = mv.m.Movie.instances[String(slots.movieNo)];
  if(movie.title !== slots.title){
    movie.title = slots.title;
  }
  if(movie.movieLength !== slots.movieLength){
    movie.movieLength = slots.movieLength;
  }
  if(movie.dateReleased !== slots.dateReleased){
    movie.dateReleased = slots.dateReleased;
  }
  console.log('Movie number ' + slots.movieNo + ' has been updated!');
}

/*delete an existing movie record
 * @method
 * */

mv.m.Movie.destroy = function(movieNo){
  if(mv.m.Movie.instances[movieNo]){
    delete mv.m.Movie.instances[movieNo];
  }else{
    console.log('There is no movie with number ' + movieNo + ' in the database!');
  }
}

/**********************************
 *****Auxiliary Methods For Testing
 **********************************/

/*create test data and add to local storage
 * @method
 * */

mv.m.Movie.createTestData = function(){
  mv.m.Movie.instances["1"] = new mv.m.Movie({
    movieNo: 1,
    title:'Sinbad',
    movieLength:'1h 15min',
    dateReleased: 'Jul 7th 1999'
  });

  mv.m.Movie.instances["2"] = new mv.m.Movie({
    movieNo: 2,
    title:'Bambi',
    movieLength:'1h 30min',
    dateReleased: 'Jul 19th 1995'
  });

  mv.m.Movie.saveAll();
}

/*clear all movie records from local storage
 * @method
 * */

mv.m.Movie.clearData = function(){
  if (confirm('Do you really want to delete all movie data?')) {
    mv.m.Movie.instances = {};
    localStorage.setItem('movies', '{}');
  }
}