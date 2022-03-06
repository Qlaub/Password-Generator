// Assignment code here

let passwordLength = function() {
  //prompt user for length of password
  let length = window.prompt("Choose password length (between 8 and 128 characters");
  length = parseInt(length);

  //checks if password length is a valid number
  if (!length || length > 128 || length < 8) {
    window.alert("Please enter a valid number");
    //recursively executes function again if not
    return passwordLength();
  }

  return length;
}

let generatePassword = function() {
  let length = passwordLength();
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
