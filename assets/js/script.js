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

const promptBuilder = function(characters, length) {
  //start of prompt
  let userPrompt = "You would like your password to include"

  //build string based on number of choices selected
  if (length === 1) {
    userPrompt += ` ${characters[0]}?`

  } else if (characters.length === 2) {
    userPrompt += ` ${characters[0]} and ${characters[1]}?`

  } else {
    //append each choice except last one at a time
    for (let i = 0; i < length-1; i++) {
      userPrompt += ` ${characters[i]},`
    }
    //append last choice without comma and with question mark
    userPrompt += ` and ${characters[length-1]}?`
  }

  return userPrompt;
}

const passwordCharacters = function() {
  characterString = []
  characters = {}

  //prompt user for lowercase letters
  let lowercase = window.confirm("Would you like to include lowercase letters?")
  if (lowercase) {
    characterString.push("lowercase letters")
    characters.lowercase = true;
  }

  //prompt user for uppercase letters
  let uppercase = window.confirm("Would you like to include uppercase letters?")
  if (uppercase) {
    characterString.push("uppercase letters")
    characters.uppercase = true;
  }

  //prompt user for numbers
  let numeric = window.confirm("Would you like to include numbers?")
  if (numeric) {
    characterString.push("numbers")
    characters.numeric = true;
  }

  //prompt user for special characters
  let special = window.confirm("Would you like to include special characters?")
  if (special) {
    characterString.push("special characters")
    characters.special = true;
  }

  //start function over if no choices selected
  if (characters.length === 0) {
    window.alert("Please choose at least one option")
    return passwordCharacters();
  }

  //confirm the users choices
  let confirmPrompt = promptBuilder(characterString, characterString.length);
  let userConfirm = window.confirm(confirmPrompt);

  //if user doesn't confirm, restart function
  if (!userConfirm) {
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

  //append all characters from each choice user made to characterString
  for (let key in userInclusions) {
    if (key === "lowercase") {
      characterString += "abcdefghijklmnopqrstuvwxyz";
    } else if (key === "uppercase") {
      characterString += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (key === "numeric") {
      characterString += "1234567890";
    } else {
      characterString += '~`! @#$%^&*()_-+={[}]|:;"' + "\\'<,>.?/"
    }
  }

  //iterate through characterString, appending a random character each time to the password
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
