const fs = require('fs');
const { Form } = require('./form.js');

const fillForm = (input, form) => {
  if (form.isValid(input)) {
    form.register(input);
    form.nextField();
  }
  if (form.areFieldsOver()) {
    process.stdin.emit('end');
  }
  console.log(form.query());
};

const writeToJson = (form, fileName) =>
  fs.writeFileSync(fileName, JSON.stringify(form.getFormDetails()), 'utf8');

const readInput = (form, dataCallback, endCallback, fileName) => {
  console.log(form.query());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => dataCallback(chunk.trim(), form));

  process.stdin.on('end', () => {
    console.log('Thank you');
    endCallback(form, fileName);
    process.exit();
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

const isAddressValid = (address) => true;

const identity = (arg) => arg;

const splitHobbies = (hobbies) => hobbies.split(',');

const main = () => {
  const form = new Form();
  form.addField('name', 'Please enter your name', isNameValid, identity);
  form.addField('dob', 'Please enter your dob', isDateValid, identity);
  form.addField('hobbies', 'Please enter your hobbies', areHobbiesValid, splitHobbies);
  form.addField('phoneNumber', 'Please enter your phone number', isPhoneNumValid, identity);
  form.addField('address', 'Please enter your address line 1', isAddressValid, identity);
  form.addField('address', 'Please enter your address line 2', isAddressValid, identity);

  readInput(form, fillForm, writeToJson, './userInfo.json');
};

main();
