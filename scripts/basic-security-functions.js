function isValidEmail(email) {
  // Regular expression pattern to check if a string is a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  
function isPasswordValid(password) {
  var hasNumber = /\d/;
  var hasLetter = /[a-zA-Z]/;
  var hasCapitalLetter = /[A-Z]/;
  var isLongEnough = password.length >= 7;
  
  return hasNumber.test(password) && hasLetter.test(password) && hasCapitalLetter.test(password) && isLongEnough;
}

function isNameValid(name) {
  var hasNonLetters = /[^a-zA-Z]/;
  
  return !hasNonLetters.test(name);
}