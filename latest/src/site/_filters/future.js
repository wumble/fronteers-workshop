/*
  Return true if a date is in the future, or false if it is in the past.
*/
module.exports = function(date) {
  var when = new Date(date);
  var now = new Date();
  return now - when < 0 ? true : false;
}
