// Assignment code here

const passwordLength = function() {
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

const passwordCharacters = function() {
  characters = {}

  //prompt user for lowercase letters
  let lowercase = window.confirm("Would you like to include lowercase letters?")
  if (lowercase) {
    characters.lowercase = true;
  }

  //prompt user for uppercase letters
  let uppercase = window.confirm("Would you like to include uppercase letters?")
  if (uppercase) {
    characters.uppercase = true;
  }

  //prompt user for numbers
  let numeric = window.confirm("Would you like to include numbers?")
  if (numeric) {
    characters.numeric = true;
  }

  //prompt user for special characters
  let special = window.confirm("Would you like to include special characters?")
  if (special) {
    characters.special = true;
  }

  //checks if object has no keys, recursively executes function if so
  if (Object.keys(characters).length === 0) {
    window.alert("Please choose at least one option")
    return passwordCharacters();
  }

  return characters;
}

const randomNum = function(min, max) {
  number = Math.floor(Math.random() * (max + 1 - min)) + min;
  return number;
}

const generatePassword = function() {
  let length = passwordLength();
  let userInclusions = passwordCharacters();

  characterString = ""
  password = ""

  for (let key in userInclusions) {
    if (key === "lowercase") {
      characterString += "abcdefghijklmnopqrstuvwxyz";
    } else if (key === "uppercase") {
      characterString += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (key === "numeric") {
      characterString += "1234567890";
    } else {
      characterString += '~`!@#$%^&*()_-+={[}]|:;"\'\\<,>.?/'
    }
  }

  for (let i=0; i < length; i++) {
    password += characterString[randomNum(0, characterString.length - 1)];
  }

  return password;
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
