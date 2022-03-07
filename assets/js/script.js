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

const generatePassword = function(attempts) {
  //declares variables only on first attempt at password
  if (attempts === 0) {
    chosenLength = passwordLength();
  }
  if (attempts === 0) {
    userInclusions = passwordCharacters();
  }

  //number of inclusions user selected from prompts
  let numberOfChoices = Object.keys(userInclusions).length

  //array to select random characters from
  let randomSelection = []

  //update array to include arrays with included characters from each user selection along with boolean value
  //boolean acts as check at end of password generation to make sure all types of characters have been included
  for (let key in userInclusions) {

    //checks against keys selected by user in prompts
    if (key === "lowercase") {
      randomSelection.push(["abcdefghijklmnopqrstuvwxyz", false]);

    } else if (key === "uppercase") {
      randomSelection.push(["ABCDEFGHIJKLMNOPQRSTUVWXYZ", false]);

    } else if (key === "numeric") {
      randomSelection.push(["1234567890", false]);

    } else {
      randomSelection.push(['~`!@#$%^&*()_-+={[}]|:;"\'\\<,>.?/', false]);
    }
  }
  
  let password = ""

  //loops in accordance to length of user password
  for (let i=0; i < chosenLength; i++) {

    //randomly select what array of characters to index into
    choice = randomNum(0, numberOfChoices - 1)

    //random index to select character within random array
    let randomCharacterArray = randomNum(0, (randomSelection[choice][0].length - 1))

    //character appended to password
    password += randomSelection[choice][0][randomCharacterArray]

    //character choice marked as having been included in password
    randomSelection[choice][1] = true;
  }

  //checks if all character choices have been included in password
  //executes function again recursively if not
  for (let i=0; i < numberOfChoices; i++) {
    if (randomSelection[i][1] === false) {

      //adds one to number of attempts, passes as argument into next attempt
      attempts++
      return generatePassword(attempts);
    }
  }

  console.log(`It took ${attempts + 1} attempt(s) to generate a password with user specifications`)
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  //generatePassword starts at first attempt (added argument)
  var password = generatePassword(0);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
