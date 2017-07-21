/**
 * @fileoverview - definition of model class: Translation Problem
 * @author - Imanuel Gittens
 * */

/**
 * @class
 * */

vt.m.TranslationProblem = class{
  constructor(slots){
    //initialize required properties
    this._source = '';
    this._targets = '';
    //if constructor is invoked with a non empty slots argument
    if(typeof  slots === 'object' && Object.keys.length > 0){
      //assign properties by invoking implicit setters
      this.source = slots.source;
      this.targets = slots.targets;
    }
  }

  /*
   * getters, checks and setters
   * */

  get source(){
    return this._source;
  }

  static checkSource( s) {
    if (s === undefined || s === "") return new NoConstraintViolation();
    else if (typeof s !== "string" || s.trim() === "") {
      return new RangeConstraintViolation(
        "The source term/phrase must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  }
  static checkSourceAsId( s) {
    var validationResult = vt.m.TranslationProblem.checkSource( s);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (s === undefined) {
        validationResult = new MandatoryValueConstraintViolation(
          "A source term/phrase must be provided!");
      } else if (vt.m.TranslationProblem.instances[s]) {
        validationResult = new UniquenessConstraintViolation(
          "There is already a translation problem record with this source!");
      } else {
        validationResult = new NoConstraintViolation();
      }
    }
    return validationResult;
  }
  static checkSourceAsIdRef( s) {
    var constraintViolation = vt.m.TranslationProblem.checkSource( s);
    if ((constraintViolation instanceof NoConstraintViolation) &&
      s !== undefined) {
      if (!vt.m.TranslationProblem.instances[s]) {
        constraintViolation = new ReferentialIntegrityConstraintViolation(
          'There is no translation problem record with this source!');
      }
    }
    return constraintViolation;
  }
  set source( s) {
    var constraintViolation = vt.m.TranslationProblem.checkSourceAsId( s);
    if (constraintViolation instanceof NoConstraintViolation) {
      this._source = s;
    } else {
      throw constraintViolation;
    }
  }

  get targets() {
    return this._targets;
  }
  set targets( t) {
    /*SIMPLIFIED CODE: no validation */
    this._targets = t;
  }
  toString() {
    return this.source +" ➞ "+ this.targets;
  }
  /**
   *  Convert TranslationProblem object to record
   *  May include special conversion for references
   */
  toRecord() {
    var rec = {};
    Object.keys( this).forEach( function (p) {
      var v = this[p];
      if (p.charAt(0) === "_") p = p.substr( 1);
      rec[p] = v;
    }, this);
    return rec;
  }
}

// *****************************************************
// *** Class-level ("static") properties ***
// *****************************************************
vt.m.TranslationProblem.instances = {};

// *****************************************************
// *** Class-level ("static") methods ***
// *****************************************************
/**
 *  Create a new author row
 */
vt.m.TranslationProblem.add = function (slots) {
  var tp = null;
  try {
    tp = new vt.m.TranslationProblem( slots);
  } catch (e) {
    console.log( e.constructor.name + ": " + e.message);
    tp = null;
  }
  if (tp) {
    vt.m.TranslationProblem.instances[tp.source] = tp;
    console.log("Saved: " + tp.toString());
  }
};
/**
 *  Update an existing author record/object
 */
vt.m.TranslationProblem.update = function (slots) {
  var tp = vt.m.TranslationProblem.instances[slots.source],
    noConstraintViolated = true,
    ending = "",
    updatedProperties = [],
    objectBeforeUpdate = util.cloneObject( tp);
  try {
    if (tp.targets !== slots.targets) {
      tp.targets = slots.targets;
      updatedProperties.push("targets");
    }
  } catch (e) {
    console.log( e.constructor.name + ": " + e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    vt.m.TranslationProblem.instances[slots.source] = objectBeforeUpdate;
  }
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      ending = updatedProperties.length > 1 ? "ies" : "y";
      console.log("Propert"+ending+" " + updatedProperties.toString() +
        " modified for problem " + tp.source);
    } else {
      console.log("No property value changed for problem " +
        tp.source + " !");
    }
  }
};
/**
 *  Delete a TranslationProblem object/record
 */
vt.m.TranslationProblem.destroy = function (s) {
  if (vt.m.TranslationProblem.instances[s]) {
    delete vt.m.TranslationProblem.instances[s];
    console.log("Translation Problem " + s + " deleted");
  } else {
    console.log("There is no translation problem with number " + s +
      " in the database!");
  }
};
/**
 *  Load all author rows and convert them to objects
 */
vt.m.TranslationProblem.retrieveAll = function () {
  var key="", keys=[], tpRows={}, i=0;
  if (!localStorage["translation_problems"]) {
    localStorage["translation_problems"] = "{}";
  }
  try {
    tpRows = JSON.parse( localStorage["translation_problems"]);
  } catch (e) {
    console.log("Error when reading from Local Storage\n" + e);
  }
  keys = Object.keys( tpRows);
  console.log( keys.length +" translation problems loaded.");
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    try {
      vt.m.TranslationProblem.instances[key] =
        new vt.m.TranslationProblem( tpRows[key]);
    } catch (e) {
      console.log( e.constructor.name + " while deserializing translation " +
        "problem "+ key +": "+ e.message);
    }
  }
};
/**
 *  Save all author objects as rows
 */
vt.m.TranslationProblem.saveAll = function () {
  var key="", tpRows={}, tp=null, i=0;
  var keys = Object.keys( vt.m.TranslationProblem.instances);
  for (i=0; i < keys.length; i++) {
    key = keys[i];
    tp = vt.m.TranslationProblem.instances[key];
    tpRows[key] = tp.toRecord();
  }
  try {
    localStorage["translation_problems"] = JSON.stringify( tpRows);
    console.log( keys.length +" translation problems saved.");
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
  }
};
