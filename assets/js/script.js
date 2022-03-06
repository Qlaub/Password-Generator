const passwordLength = function() {
  //prompt user for length of password
  let inputLength = window.prompt("Choose password length between 8 and 128 characters");
  inputLength = parseInt(inputLength);

  //checks if password length is a valid number
  if (!inputLength || inputLength > 128 || inputLength < 8) {
    window.alert("Please enter a valid number");
    //recursively executes function again if not
    return passwordLength();
  }
  return inputLength;
}

const passwordCharacters = function() {

  //object to store user character choice selections
  characters = {}

  //prompt user for lowercase letters
  let lowercase = window.confirm("Would you like to include lowercase letters?")
  if (lowercase) {
    //store in object if yes
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

  //checks if object has not selected any options, recursively executes function if so
  if (Object.keys(characters).length === 0) {
    window.alert("Please choose at least one option")
    return passwordCharacters();
  }

  return characters;
}

const randomNum = function(min, max) {
  //generate random number in range min to max
  number = Math.floor(Math.random() * (max + 1 - min)) + min;
  return number;
}

const generatePassword = function() {
  let chosenLength = passwordLength();
  let userInclusions = passwordCharacters();

  characterString = ""
  password = ""

  //iterate through keys in userInclusions object, appending all characters from each choice to characterString
  //switch would also work here with a case for each possible key defaulting to special
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

  //loop chosenLength number of times, appending a random character each time to the password
  for (let i=0; i < chosenLength; i++) {
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
