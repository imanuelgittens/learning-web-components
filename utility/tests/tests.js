QUnit.test('Window.jHelp.isEmailAddress', function(assert){
  assert.throws(
    function(){
      Window.jHelp.isEmailAddress('');
    },
    function(err){
      return err.toString() === 'Missing parameter "input".';
    },
    'Error message should be shown when input is empty.'
  );
  assert.deepEqual(Window.jHelp.isEmailAddress('@gmail.com'), false, 'Missing username section of email.');
  assert.deepEqual(Window.jHelp.isEmailAddress('imanuelgmail.com'), false, 'Missing @ symbol.');
  assert.deepEqual(Window.jHelp.isEmailAddress('imanuel@gmailcom'), false, 'Missing . in domain definition.')
  assert.deepEqual(Window.jHelp.isEmailAddress('gittensimanuel@gmail.com'), true, 'Properly formatted Email.');
});

QUnit.test('Window.jHelp.isPhoneNumber', function(assert){
  //testing for Trinidadian phone number
  assert.throws(
    function(){
      Window.jHelp.isPhoneNumber('');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isPhoneNumber function: "input".';
    },
    'Error message should shown when input is empty.'
  );

  assert.throws(
    function(){
      Window.jHelp.isPhoneNumber('13212');
    },
    function(err){
      return err.toString() === 'Too short to be a valid phone number.';
    },
    'Error message should be shown when number is too short.'
  );

  assert.deepEqual(Window.jHelp.isPhoneNumber('1-868-234-3212'), true, 'Valid Phone Number with dash delimiter.');
  assert.deepEqual(Window.jHelp.isPhoneNumber('1 868 234 3212'), true, 'Valid Phone Number with space delimiter.');
  assert.deepEqual(Window.jHelp.isPhoneNumber('18682343212'), true, 'Valid Phone Number with no delimiter delimiter.');
  assert.deepEqual(Window.jHelp.isPhoneNumber('1 223 234 3212'), false, 'Wrong area code.');
  assert.deepEqual(Window.jHelp.isPhoneNumber('2 868 234 3212'), false, 'Wrong country code.');
});

QUnit.test('Window.jHelp.withoutSymbols', function(assert) {
  //ensure string has no symbols
  assert.throws(
    function(){
      Window.jHelp.withoutSymbols('');
    },
    function(err){
      return err.toString() === 'Missing Parameter in withoutSymbols function: "input".';
    },
    'If input is empty, an error message should be shown'
  );
  assert.deepEqual(Window.jHelp.withoutSymbols('AsweRf'), true, 'Should return true if the string has no symbols.');
  assert.deepEqual(Window.jHelp.withoutSymbols('Aswe@Rf'), false, 'Should return false if the string has symbols.');
  assert.deepEqual(Window.jHelp.withoutSymbols('1 AsweRf'), true, 'Should return true if the string has no symbols, even if it has numbers and spaces.');
});


//all date functions here should be implemented using a library like moment.js. Tests don't work for all browsers.
QUnit.test('Window.jHelp.isDate', function(assert){
  assert.throws(
    function(){
      Window.jHelp.isDate('');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isDate function: "input".';
    },
    'Should throw an error is input is empty'
  );

  assert.deepEqual(Window.jHelp.isDate('2017-01-08'), true, 'Should return true if input is a valid date');
  assert.deepEqual(Window.jHelp.isDate('fkdl'), false, 'Should return false if input is a invalid date');
});

QUnit.test('Window.jHelp.isBeforeDate', function(assert) {
  //compare two dates
  assert.throws(
    function(){
      Window.jHelp.isBeforeDate('', '01-07-2017');
    },
    function(err){
        return err.toString() === 'Missing Parameter in isBeforeDate function: "input".';
    },
    'If the input is empty, an error message should be displayed.'
  );

  assert.throws(
    function(){
      Window.jHelp.isBeforeDate('01-07-2017', '');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isDate function: "reference".';
    },
    'If the reference is empty, an error message should be displayed'
  );

  assert.throws(
    function(){
      Window.jHelp.isBeforeDate('01^07_2017', '01^07_2017');
    },
    function(err){
      return err.toString() === 'Invalid date format - 01^07_2017';
    },
    'If input is not a valid date, an error message should show.'
  );

  assert.throws(
    function(){
      Window.jHelp.isBeforeDate('01^07_2017', '01^07_2017');
    },
    function(err){
      return err.toString() === 'Invalid date format - 01^07_2017'
    },
    'If reference is not a valid date, an error message should show.'
  );

  assert.deepEqual(Window.jHelp.isBeforeDate('01-07-2017', '01-08-2017'), true, 'Should return true if input date is before reference date');
  assert.deepEqual(Window.jHelp.isBeforeDate('01-08-2017', '01-07-2017'), false, 'Should return false if input date is before reference date');
});

QUnit.test('Window.jHelp.isAfterDate', function(assert) {
  //compare two dates
  assert.throws(
    function(){
      Window.jHelp.isAfterDate('', '01-07-2017');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isAfterDate function: "input".';
    },
    'If the input is empty, an error message should be displayed.'
  );

  assert.throws(
    function(){
      Window.jHelp.isAfterDate('01-07-2017', '');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isAfterDate function: "reference".';
    },
    'If the reference is empty, an error message should be displayed'
  );

  assert.throws(
    function(){
      Window.jHelp.isAfterDate('01^07_2017', '01^07_2017');
    },
    function(err){
      return err.toString() === 'Invalid date format - 01^07_2017';
    },
    'If input is not a valid date, an error message should show.'
  );

  assert.throws(
    function(){
      Window.jHelp.isAfterDate('01^07_2017', '01^07_2017');
    },
    function(err){
      return err.toString() === 'Invalid date format - 01^07_2017'
    },
    'If reference is not a valid date, an error message should show.'
  );

  assert.deepEqual(Window.jHelp.isAfterDate('01-08-2017', '01-07-2017'), true, 'Should return true if input date is before reference date');
  assert.deepEqual(Window.jHelp.isAfterDate('01-07-2017', '01-08-2017'), false, 'Should return false if input date is before reference date');
});

QUnit.test('Window.jHelp.isBeforeToday', function(assert){
  assert.throws(
    function(){
      Window.jHelp.isBeforeToday('');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isBeforeDate function: "input".';
    },
    'If input is empty, an error should be thrown.'
  );

  assert.deepEqual(Window.jHelp.isBeforeToday('2017 06 29'), true, 'Dates before today should return true.');
  assert.deepEqual(Window.jHelp.isBeforeToday('2019 07 29'), false, 'Dates after today should return false.');
});

QUnit.test('Window.jHelp.isAfterToday', function(assert){
  assert.throws(
    function(){
      Window.jHelp.isAfterToday('');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isAfterDate function: "input".';
    },
    'If input is empty, an error should be thrown.'
  );

  assert.deepEqual(Window.jHelp.isAfterToday('2017 06 29'), false, 'Dates before today should return false.');
  assert.deepEqual(Window.jHelp.isAfterToday('2019 07 29'), true, 'Dates after today should return true.');
});

QUnit.test('Window.jHelp.isEmpty', function(assert){
  assert.throws(function(){
    Window.jHelp.isEmpty();
  },
    function(err){
      return err.toString() === 'Missing Parameter in isEmpty function: "input".';
    },
    'If input is empty, an error should be shown.'
  );
  assert.deepEqual(Window.jHelp.isEmpty(''), true, 'Input of length 0 should return true');
  assert.deepEqual(Window.jHelp.isEmpty('    '), true, 'Inputs with only spaces should return true');
});

QUnit.test('Window.jHelp.contains', function(assert){
  assert.throws(function(){
    Window.jHelp.contains();
  },
    function(err){
      return err.toString() === 'No parameters entered.';
    },
    'If no parameters are entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.contains('hello there');
    },
    function(err){
      return err.toString() === 'Missing Parameter in contains function: "wordsArray".';
    },
    'If wordsArray is not entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.contains('',['hello', 'there']);
    },
    function(err){
      return err.toString() === 'Missing Parameter in contains function: "inputString".';
    },
    'If input string is not entered, an error should be shown'
  );

  assert.deepEqual(Window.jHelp.contains('Hello there puppy',['hello', 'there']), true, 'Return true if the words exist.');
  assert.deepEqual(Window.jHelp.contains('Hello there puppy',['cat']), false, 'Return false if the words don\'t exist.');
});

QUnit.test('Window.jHelp.lacks', function(assert){
  assert.throws(function(){
      Window.jHelp.lacks();
    },
    function(err){
      return err.toString() === 'No parameters entered.';
    },
    'If no parameters are entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.lacks('hello there');
    },
    function(err){
      return err.toString() === 'Missing Parameter in lacks function: "wordsArray".';
    },
    'If wordsArray is not entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.lacks('',['hello', 'there']);
    },
    function(err){
      return err.toString() === 'Missing Parameter in lacks function: "inputString".';
    },
    'If input string is not entered, an error should be shown'
  );

  assert.deepEqual(Window.jHelp.lacks('Hello there puppy',['hello', 'there']), false, 'Return false if the words exist.');
  assert.deepEqual(Window.jHelp.lacks('Hello there puppy',['cat']), true, 'Return true if the words don\'t exist.');
});

QUnit.test('Window.jHelp.isComposedOf', function(assert){
  assert.throws(function(){
      Window.jHelp.isComposedof();
    },
    function(err){
      return err.toString() === 'No parameters entered.';
    },
    'If no parameters are entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.isComposedof('hello there');
    },
    function(err){
      return err.toString() === 'Missing Parameter in lacks function: "arr".';
    },
    'If wordsArray is not entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.isComposedof('',['hello', 'there']);
    },
    function(err){
      return err.toString() === 'Missing Parameter in lacks function: "input".';
    },
    'If input string is not entered, an error should be shown'
  );

  assert.deepEqual(Window.jHelp.isComposedof('Hello there puppy',['hello', 'there']), false, 'Return false if the string contains words not found in the array exist.');
  assert.deepEqual(Window.jHelp.isComposedof('Hello there puppy',['hello', 'there', 'puppy']), true, 'Return true if all the words in the string exist in the array.');
});

QUnit.test('Window.jHelp.isLength', function(assert){
  assert.throws(function(){
      Window.jHelp.isLength();
    },
    function(err){
      return err.toString() === 'No parameters entered.';
    },
    'If no parameters are entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.isLength('hello there');
    },
    function(err){
      return err.toString() === 'Missing Parameter in isLength function: "n".';
    },
    'If n is not entered, an error should be shown'
  );

  assert.throws(function(){
      Window.jHelp.isLength('',3);
    },
    function(err){
      return err.toString() === 'Missing Parameter in lacks function: "input".';
    },
    'If input string is not entered, an error should be shown'
  );
  assert.deepEqual(Window.jHelp.isComposedof('Hello there puppy',['hello', 'there']), false, 'Return false if the string contains words not found in the array exist.');
  assert.deepEqual(Window.jHelp.isComposedof('Hello there puppy',['hello', 'there', 'puppy']), true, 'Return true if all the words in the string exist in the array.');
});