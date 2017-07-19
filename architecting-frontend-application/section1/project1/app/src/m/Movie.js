/**
* @file overwiew: Contains definition of model class Movie
* @author: Imanuel Gittens
* */

/**
* @Class
* */

mv.m.Movie = function(slots){
  //assign default values to mandatory properties
  this.movieNo = 0;
  this.title = '';
  this.movieLength = '';
  this.dateReleased = '';
  //assign properties only if the constructor is invoked with an argument
  if(arguments.length > 0){
    this.setMovieNo(slots.movieNo);
    this.setTitle(slots.title);
    this.setMovieLength(slots.movieLength);
    this.setDateReleased(slots.dateReleased);
  }

  // this.movieNo = slots.movieNo;
  // this.title = slots.title;
  // this.movieLength = slots.movieLength;
  // this.dateReleased = slots.dateReleased;
}


/******************************************
 ******Class level (static) Properties*****
 * ***************************************/

//initially an empty collection in the form of a map

mv.m.Movie.instances = {};


/******************************************
 **********Checks and Setters**************
 * ***************************************/

mv.m.Movie.checkMovieNo = function(movieNum){
  if(movieNum === undefined){
    return new MandatoryValueConstraintViolation('A movie number must be provided.');
  }else if(!util.isIntegerOrIntegerString(movieNum) || parseInt(movieNum) < 1){
    return new RangeConstraintViolation('Movie number must be a number.');
  }/*else if(movieNum < 0){
    return new IntervalConstraintViolation('Movie number cannot be less than 0.')
  }*/else{
    return new NoConstraintViolation();
  }
}

mv.m.Movie.checkMovieNoAsId = function(movieNum){
  var validationResult = mv.m.Movie.checkMovieNo(movieNum);
  if((validationResult instanceof NoConstraintViolation)){
    if(movieNum === undefined){
      return new MandatoryValueConstraintViolation('A movie number must be provided.');
    }else if(mv.m.Movie.instances[String(movieNum)]){
      validationResult = new UniquenessConstraintViolation('That movie already exists.');
    }else{
      validationResult = new NoConstraintViolation();
    }
  }
  return validationResult;
}

mv.m.Movie.checkTitle = function(title){
  if(title === undefined){
    return new MandatoryValueConstraintViolation('Title must be provided.')
  }else if(typeof title !== 'string'){
    return new RangeConstraintViolation('Title must be a string.');
  }else if(title.trim().length < 1 || title.trim().length > 250){
    return new IntervalConstraintViolation('Title cannot be less than 1 or longer than 250 characters.');
  }else{
    return new NoConstraintViolation();
  }
}

mv.m.Movie.checkMovieLength = function(length){
  if(length === undefined){
    return new MandatoryValueConstraintViolation('Length must be provided.')
  }else if(typeof length !== 'string'){
    return new RangeConstraintViolation('Length must be a string.');
  }else if(!/^\dh\s\d{2}min/i.test(length)){
    return new IntervalConstraintViolation('Length must be of the form {X}h {X}min where X is a number.');
  }else{
    return new NoConstraintViolation();
  }
}

mv.m.Movie.checkDateReleased = function(dateReleased){
  if(dateReleased === undefined){
    return new MandatoryValueConstraintViolation('Release Date must be provided.')
  }/*else if(Object.prototype.toString.call(dateReleased) !== '[object Date]'){
    return new RangeConstraintViolation('Must be a valid date.');
  }*/else if(dateReleased.trim().length <= 0){
    return new IntervalConstraintViolation('Date cannot be empty.');
  }else{
    return new NoConstraintViolation();
  }
}

mv.m.Movie.prototype.setMovieNo = function(movieNo){
  var validationResult = mv.m.Movie.checkMovieNoAsId(movieNo);
  if(validationResult instanceof NoConstraintViolation){
    this.movieNo = movieNo;
  }else{
    throw validationResult;
  }
}

mv.m.Movie.prototype.setTitle = function(title){
  var validationResult = mv.m.Movie.checkTitle(title);
  if(validationResult instanceof NoConstraintViolation){
    this.title = title;
  }else{
    throw validationResult;
  }
}

mv.m.Movie.prototype.setMovieLength = function(movieLength){
  var validationResult = mv.m.Movie.checkMovieLength(movieLength);
  if(validationResult instanceof NoConstraintViolation){
    this.movieLength = movieLength;
  }else{
    throw validationResult;
  }
}

mv.m.Movie.prototype.setDateReleased = function(releaseDate){
  var validationResult = mv.m.Movie.checkDateReleased(releaseDate);
  if(validationResult instanceof NoConstraintViolation){
    this.dateReleased = releaseDate;
  }else{
    throw validationResult;
  }
}

/******************************************
 ******Other Instance Level Methods*****
 * ***************************************/

/**
 * serialize movie object
 * @method
 * */

mv.m.Movie.prototype.toString = function(){
  return 'Movie{ Movie number: ' + this.movieNo + ', Title: ' + this.title + ', Length: '+ this.movieLength + ', Date Released: ' + this.dateReleased + '}';
}

/******************************************
 *******Class level (static) Methods*******
 ******************************************/

/**convert movie records to movie objects.
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
  var movie = null;
  try{
    movie = new mv.m.Movie(slots);
  }catch(e){
    console.log(e.constructor.name + ': ' + e.message);
    movie = null;
  }
  if(movie){
    mv.m.Movie.instances[String(slots.movieNo)] = new mv.m.Movie(slots);
    console.log('Movie number ' + slots.movieNo + ' was created!');
  }
}

/*Update an existing movie record
 * @method
 * */

mv.m.Movie.update = function(slots){
  var movie = mv.m.Movie.instances[String(slots.movieNo)];
  var noConstraintViolated = true;
  var updatedProperties = [];
  var objectBeforeUpdate = util.cloneObject(movie);

  try {
    if (movie.movieNo !== slots.movieNo) {
      movie.setMovieNo( slots.movieNo);
      updatedProperties.push('movieNo');
    }
    if (movie.title !== slots.title) {
      movie.setTitle( slots.title);
      updatedProperties.push('title');
    }
    if (movie.movieLength !== slots.movieLength) {
      movie.setMovieLength( slots.movieLength);
      updatedProperties.push('movieLength');
    }
    if (movie.dateReleased !== slots.dateReleased) {
      movie.setDateReleased( slots.dateReleased);
      updatedProperties.push('dateReleased');
    }

  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    mv.m.Movie.instances[slots.movieNo] = objectBeforeUpdate;
  }
  if(noConstraintViolated){
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() +
        " modified for movie: " + slots.movieNo);
    } else {
      console.log("No property value changed for the movie number: " + slots.movieNo + "!");
    }
  }

  //retrieve movies from main memory database
  //var movie = mv.m.Movie.instances[String(slots.movieNo)];

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