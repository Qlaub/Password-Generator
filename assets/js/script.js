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
    return userPrompt;
  } else if (characters.length === 2) {
    userPrompt += ` ${characters[0]} and ${characters[1]}?`
  } else {
    //append each choice one at a time
    for (let i = 0; i < length-1; i++) {
      userPrompt += ` ${characters[i]},`
    }
    //append last choice without comma and with question mark
    userPrompt += ` and ${characters[length-1]}?`
  }

  return userPrompt;
}

const passwordCharacters = function() {
  characters = []

  //prompt user for lowercase letters
  let lowercase = window.confirm("Would you like to include lowercase letters?")
  if (lowercase) {
    characters.push("lowercase letters")
  }

  //prompt user for uppercase letters
  let uppercase = window.confirm("Would you like to include uppercase letters?")
  if (uppercase) {
    characters.push("uppercase letters")
  }

  //prompt user for numbers
  let numeric = window.confirm("Would you like to include numbers?")
  if (numeric) {
    characters.push("numbers")
  }

  //prompt user for special characters
  let special = window.confirm("Would you like to include special characters?")
  if (special) {
    characters.push("special characters")
  }

  if (characters.length === 0) {
    window.alert("Please choose at least one option")
    return passwordCharacters();
  }

  //confirm the users choices
  let confirmPrompt = promptBuilder(characters, characters.length);
  console.log(confirmPrompt);

  let userConfirm = window.confirm(confirmPrompt);
  //if user doesn't confirm, restart function
  if (!userConfirm) {
    return passwordCharacters();
  }

  return characters;
}

const generatePassword = function() {
  let length = passwordLength();
  let characters = passwordCharacters();
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
