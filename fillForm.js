const fs = require('fs');
const { Form } = require('./form.js');

const fillForm = (input, form) => {
  if (form.validate(input)) {
    form.register(input);
    form.nextField();
  }
  console.log(form.query());
};

const writeToJson = (form, fileName) =>
  fs.writeFileSync(fileName, JSON.stringify(form.getFormDetails()), 'utf8');

const readInput = (form, dataCallback, endCallback, fileName) => {
  console.log(form.query());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => dataCallback(chunk.trim(), form));
  process.stdin.on('end', () => endCallback(form, fileName));
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

const isAddressValid = (address) => true;

const main = () => {
  const fields = [
    'name', 'dob', 'hobbies', 'phoneNumber', 'address', 'address'
  ];
  const queries = [
    'Please enter your name', 'Please enter your DOB', 'Please enter your hobbies', 'Enter phone number', 'Enter address line 1', 'Enter address line 2', 'Thank you'
  ];
  const validators = [
    isNameValid, isDateValid, areHobbiesValid,
    isPhoneNumValid, isAddressValid, isAddressValid
  ];
  const form = new Form(fields, queries, validators);
  readInput(form, fillForm, writeToJson, './userInfo.json');
};

main();
