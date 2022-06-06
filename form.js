const fs = require('fs');

const writeToJson = (inputs, fileName) => {
  const userInfo = {};
  userInfo.name = inputs[0];
  userInfo.dob = inputs[1];
  userInfo.hobbies = inputs[2].split(',');
  userInfo.phoneNumber = +inputs[3];
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

const areAllDigits = (string) => {
  return /^\d+$/.test(string);
};

const isNameValid = (name) => {
  return name.length > 4 && areAllAlphabets(name);
};

const isDateValid = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

const areHobbiesValid = (hobbies) => hobbies.length > 0;

const isPhoneNumValid = (phoneNumber) => {
  return phoneNumber.length === 10 && areAllDigits(phoneNumber);
};

const main = () => {
  const messages = [
    'Please enter your name', 'Please enter your DOB', 'Please enter your hobbies', 'Enter phone number', 'Thank you'
  ];
  const validators = [
    isNameValid, isDateValid, areHobbiesValid, isPhoneNumValid
  ];
  readInput(writeToJson, messages, validators, './userInfo.json');
};

main();
