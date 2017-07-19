/*
 * @fileOverview - defines error classes (also called Exception classes) for property constraint validation
 * @author - Imanuel Gittens
 * */

function ConstraintViolation(msg, culprit){
  this.message = msg;
  if(culprit){
    this.culprit = culprit;
  }
}

function NoConstraintViolation(v){
  if(v !== undefined){
    this.checkedValue = v;
  }
  this.message = '';
}

NoConstraintViolation.prototype = Object.create(NoConstraintViolation.prototype);
NoConstraintViolation.prototype.constructor = NoConstraintViolation;

function MandatoryValueConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

MandatoryValueConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
MandatoryValueConstraintViolation.prototype.constructor = MandatoryValueConstraintViolation;

function RangeConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

RangeConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
RangeConstraintViolation.prototype.constructor = RangeConstraintViolation;

function StringLengthConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

StringLengthConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
StringLengthConstraintViolation.prototype.constructor = StringLengthConstraintViolation;

function IntervalConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

IntervalConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
IntervalConstraintViolation.prototype.constructor = IntervalConstraintViolation;

function PatternConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

PatternConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
PatternConstraintViolation.prototype.constructor = PatternConstraintViolation;

function UniquenessConstraintViolation(msg, culprit){
  ConstraintViolation.call(this, msg, culprit);
}

UniquenessConstraintViolation.prototype = Object.create(ConstraintViolation.prototype);
UniquenessConstraintViolation.prototype.constructor = UniquenessConstraintViolation;

