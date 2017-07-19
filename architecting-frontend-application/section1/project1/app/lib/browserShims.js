'use strict';
/**
 * Implement some ECMASCRIPT6 methods for browsers
 * that don't support them natively
 */
if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) &&
      nVal > -9007199254740992 && nVal < 9007199254740992 &&
      Math.floor(nVal) === nVal;
  };
}
/**
 * Test if an array is equal to another one
 */
Array.prototype.isEqualTo = function (a2) {
  return (this.length === a2.length) && this.every( function( el, i) {
      return el === a2[i]; });
};
