const fs = require('fs');
const { Form, registerResponse } = require('./src/form.js');

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

const isAddressValid = (address) => true;

const identity = (arg) => arg;

const splitHobbies = (hobbies) => hobbies.split(',');

const onFormFilled = (responses) => {
  fs.writeFileSync('./form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const form = new Form();
  form.addField('name', 'Please enter your name', isNameValid, identity);
  form.addField('dob', 'Please enter your dob', isDateValid, identity);
  form.addField('hobbies', 'Please enter your hobbies', areHobbiesValid, splitHobbies);
  form.addField('phoneNumber', 'Please enter your phone number', isPhoneNumValid, identity);
  form.addField('address', 'Please enter your address line 1', isAddressValid, identity);
  form.addField('address', 'Please enter your address line 2', isAddressValid, identity);

  console.log(form.query());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (response) =>
    registerResponse(response.trim(), form, console.log, onFormFilled));
};

main();
