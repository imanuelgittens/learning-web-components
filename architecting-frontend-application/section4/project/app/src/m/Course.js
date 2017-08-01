/**
 * @fileoverview - definition of model class: Course
 * @author - Imanuel Gittens
 * */

vt.m.SourceLangEL = new eNUMERATION("SourceLangEL",
  {"ES":"Spanish","FR":"French","PT":"Portuguese","DE":"German", "IT":"Italian", "EN":"English"});
vt.m.TargetLangEL = new eNUMERATION("TargetLangEL",
  {"ES":"Spanish","FR":"French","PT":"Portuguese","DE":"German", "IT":"Italian", "EN":"English"});

/**
 * @class
 * */

vt.m.Course = class{
  constructor(slots){
    //initialize required properties
    this._courseId = 0;
    this._courseTitle = '';
    this._courseDescription = '';
    this._availableSourceLang = [];
    this._availableTargetLang = [];
    //if constructor is invoked with a non empty slots argument
    if(typeof  slots === 'object' && Object.keys.length > 0){
      //assign properties by invoking implicit setters
      this.courseId = slots.courseId;
      this.courseTitle = slots.courseTitle;
      this.courseDescription = slots.courseDescription;
      this.availableSourceLang = slots.availableSourceLang;
      this.availableTargetLang = slots.availableTargetLang;
    }
  }

  /*
   * getters, checks and setters
   * */

  get courseId(){
    return this._courseId;
  }

  static checkCourse(id){
    if(!id){
      return new NoConstraintViolation();
    }else if(!util.isIntegerOrIntegerString(id) || parseInt(id) < 1){
      return new RangeConstraintViolation('A course number must be a positive integer!');
    }else{
      return new NoConstraintViolation();
    }
  }

  static checkCourseAsId(id){
    var validationResult = vt.m.Course.checkCourse(id);
    if(validationResult instanceof  NoConstraintViolation){
      if(!id){
        validationResult = new MandatoryValueConstraintViolation('A course number must be provided!');
      }else if(vt.m.Course.instances[String(id)]){
        validationResult = new UniquenessConstraintViolation('That course number already exists in the database!');
      }else{
        validationResult = new NoConstraintViolation();
      }
    }
    return validationResult;
  }

  set courseId(id){
    var validationResult = vt.m.Course.checkCourseAsId(id);
    if(validationResult instanceof NoConstraintViolation){
      this._courseId = parseInt(id);
    }else{
      throw validationResult;
    }
  }

  get courseTitle(){
    return this._courseTitle;
  }

  static checkCourseTitle(title){
    if(!title){
      return new MandatoryValueConstraintViolation('A title must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set courseTitle(title){
    var validationResult = vt.m.Course.checkCourseTitle(title);
    if(validationResult instanceof NoConstraintViolation){
      this._courseTitle = title;
    }else{
      throw validationResult;
    }
  }

  get courseDescription(){
    return this._courseDescription;
  }

  static checkCourseDescription(desc){
    if(!desc){
      return new MandatoryValueConstraintViolation('A course description must be provided!');
    }else{
      return new NoConstraintViolation();
    }
  }

  set courseDescription(desc){
    var validationResult = vt.m.Course.checkCourseDescription(desc);
    if(validationResult instanceof NoConstraintViolation){
      this._courseDescription = desc;
    }else{
      throw validationResult;
    }
  }

  get availableSourceLang() {
    return this._availableSourceLang;
  }
  static checkAvailableSourceLang( asl) {
    var max = vt.m.SourceLangEL.MAX;
    if (!util.isIntegerOrIntegerString(asl) || parseInt(asl) < 1 ||
      parseInt(asl) > max) {
      return new RangeConstraintViolation(
        "Any item of the availableSourceLanguages list must be a positive integer " +
        "not greater than" + max + " !");
    } else return new NoConstraintViolation();
  }

  static checkAvailableSourceLangs( langs) {
    var i=0, constraintViolation=null;
    if (langs === undefined || (Array.isArray( langs) && langs.length === 0)) {
      return new MandatoryValueConstraintViolation(
        "At least one available source language must be chosen/provided!");
    } else if (!Array.isArray( langs)) {
      return new RangeConstraintViolation(
        "The value of availableSourceLanguages must be a list/array!");
    } else {
      for (i=0; i < langs.length; i++) {
        constraintViolation = vt.m.Course.checkAvailableSourceLang( langs[i]);
        if (!(constraintViolation instanceof NoConstraintViolation)) {
          return constraintViolation;
        }
      }
      return new NoConstraintViolation();
    }
  }

  set availableSourceLang (langs) {
    var validationResult = vt.m.Course.checkAvailableSourceLangs( langs);
    if (validationResult instanceof NoConstraintViolation) {
      this._availableSourceLang = langs;
    } else {
      throw validationResult;
    }
  }

  get availableTargetLang() {
    return this._availableTargetLang;
  }
  static checkAvailableTargetLang( atl) {
    var max = vt.m.TargetLangEL.MAX;
    if (!util.isIntegerOrIntegerString(atl) || parseInt(atl) < 1 ||
      parseInt(atl) > max) {
      return new RangeConstraintViolation(
        "Any item of the availableTargetLanguages list must be a positive integer " +
        "not greater than" + max + " !");
    } else return new NoConstraintViolation();
  }

  static checkAvailableTargetLangs( langs) {
    var i=0, constraintViolation=null;
    if (langs === undefined || (Array.isArray( langs) && langs.length === 0)) {
      return new MandatoryValueConstraintViolation(
        "At least one available target language must be chosen/provided!");
    } else if (!Array.isArray( langs)) {
      return new RangeConstraintViolation(
        "The value of availableTargetLanguages must be a list/array!");
    } else {
      for (i=0; i < langs.length; i++) {
        constraintViolation = vt.m.Course.checkAvailableTargetLang( langs[i]);
        if (!(constraintViolation instanceof NoConstraintViolation)) {
          return constraintViolation;
        }
      }
      return new NoConstraintViolation();
    }
  }

  set availableTargetLang (langs) {
    var validationResult = vt.m.Course.checkAvailableTargetLangs( langs);
    if (validationResult instanceof NoConstraintViolation) {
      this._availableTargetLang = langs;
    } else {
      throw validationResult;
    }
  }

  /**
   *  Convert object to string
   */
  toString() {
    return "Course{ No: " + this.courseId +
      ", Title: " + this.courseTitle +
      ", Description: " + this.courseDescription +
      ", Avail. source lang.: " + this.availableSourceLang.toString() +
      ", Avail. target lang.: " + this.availableTargetLang.toString() +
      "}";
  }


  /**
   *  Convert object to record
   */
  toRecord() {
    var rec = {};
    Object.keys( this).forEach( function (p) {
      // copy only property slots with underscore prefix
      if (p.charAt(0) === "_") {
        switch (p) {
          case "_author":
            // convert object reference to ID reference
            if (this._author) rec.author_id = this._author.personId;
            break;
          case "_problems":
            // convert the list of object references to ID references
            rec.problemIdRefs = [];
            this._problems.forEach( function (problem) {
              rec.problemIdRefs.push( problem.source);
            });
            break;
          default:
            // remove underscore prefix
            rec[p.substr(1)] = this[p];
        }
      }
    }, this);
    return rec;
  }

}

/**
 * Class level static properties
 * */

//initially an empty collection in the form of a map
vt.m.Course.instances = {};

/***********************************************
 ***  Class-level ("static") methods  **********
 ***********************************************/
/**
 * Create a new learning unit object and add it to the class population
 * @method
 */
vt.m.Course.add = function (slots) {
  var course = null;
  try {
    course = new vt.m.Course( slots);
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    course = null;
  }
  if (course) {
    //console.log(course)
    vt.m.Course.instances[String(course.courseId)] = course;
    console.log( course.toString() + " created!");
  }
};

/**
 * Update an existing learning unit record
 * @method
 */
vt.m.Course.update = function (slots) {
  var cu = vt.m.Course.instances[slots.courseId],
    noConstraintViolated = true,
    updatedProperties = [],
    objectBeforeUpdate = util.cloneObject( cu);
  try {
    if (cu.courseTitle !== slots.courseTitle) {
      cu.courseTitle = slots.courseTitle;
      updatedProperties.push("title");
    }
    if (cu.courseDescription !== slots.courseDescription) {
      cu.courseDescription = slots.courseDescription;
      updatedProperties.push("title");
    }
    if (!cu.availableSourceLang.isEqualTo(slots.availableSourceLang)) {
      cu.availableSourceLang = slots.availableSourceLang;
      updatedProperties.push("source lang");
    }
    if (!cu.availableTargetLang.isEqualTo(slots.availableTargetLang)) {
      cu.availableTargetLang = slots.availableTargetLang;
      updatedProperties.push("target lang");
    }
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    vt.m.Course.instances[slots.courseId] = objectBeforeUpdate;
  }
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() +
        " modified for course " + slots.courseId);
    } else {
      console.log("No property value changed for course " +
        slots.courseId + "!");
    }
  }
};

/**
 * Delete a learning unit record from persistent storage
 * @method
 */
vt.m.Course.destroy = function (courseNo) {
  // if (vt.m.Course.instances[courseNo]) {
  //   delete vt.m.Course.instances[courseNo];
  //   console.log("Course " + courseNo + " deleted");
  // } else {
  //   console.log("There is no course with number " + courseNo +
  //     " in the database!");
  // }

  var c = vt.m.Course.instances[courseNo],
    key="", keys=[], lu=null, i=0, j=0;
  // delete all course references from learning units
  keys = Object.keys( vt.m.LearningUnit.instances);
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    lu = vt.m.LearningUnit.instances[key];
    for(j = lu.courses.length-1; j>=0; j--){
      if (lu.courses[j].source === c) {
        lu.courses.splice(j, 1);
        break;
      }
    }
  }
  // delete the course
  delete vt.m.Course.instances[c];
};

/**
 * Retrieve learning units table from local storage
 * @method
 */
vt.m.Course.retrieveAll = function () {
  var key="", keys=[], courseString="", courseRows={}, i=0;
  try {
    if (localStorage["courses"]) {
      courseString = localStorage["courses"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (courseString) {
    courseRows = JSON.parse( courseString);
    keys = Object.keys( courseRows);
    console.log( keys.length +" Courses loaded.");
    try {
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        vt.m.Course.instances[key] =
          new vt.m.Course( courseRows[key]);
      }
    } catch (e) {
      console.log( e.constructor.name + " while deserializing course " + key +": "+ e.message);
    }
  }
};

/**
 * Save all learning unit objects to Local Storage
 * @method
 */
vt.m.Course.saveAll = function () {
  var key="", rows={}, obj=null, i;
  var keys = Object.keys( vt.m.Course.instances);
  // convert the map of objects to map of corresponding rows
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    obj = vt.m.Course.instances[key];
    // serialize Course object
    rows[key] = obj.toRecord();
  }
  try {
    localStorage["courses"] = JSON.stringify( rows);
    console.log( keys.length +" courses saved.");
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
  }
};
