const fs = require('fs');

const writeToJson = (inputs, fileName) => {
  const userInfo = {};
  userInfo.name = inputs[0];
  userInfo.dob = inputs[1];
  userInfo.hobbies = inputs[2].split(',');
  fs.writeFileSync(fileName, JSON.stringify(userInfo), 'utf8');
};

const readInput = (callback, messages, validators, fileName) => {
  let index = 0;
  const inputs = [];
  console.log(messages[index]);
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const validator = validators[index];
    const input = chunk.trim();
    if (validator(input)) {
      inputs.push(input);
      index++;
    }
    console.log(messages[index]);
  });

  process.stdin.on('end', () => {
    callback(inputs, fileName);
  });
};

const areAllAlphabets = (string) => {
  return /^[a-z]+$/.test(string);
};

const isNameValid = (name) => {
  return name.length < 5 ? false : areAllAlphabets(name);
};

const isDateValid = (date) => true;
const areHobbiesValid = (hobbies) => hobbies.length > 0;

const main = () => {
  const messages = ['Please enter your name', 'Please enter your DOB', 'Please enter your hobbies', 'Thank you'];
  const validators = [isNameValid, isDateValid, areHobbiesValid];
  readInput(writeToJson, messages, validators, './userInfo.json');
};

main();
