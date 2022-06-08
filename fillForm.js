const fs = require('fs');
const { Field } = require('./src/field.js');
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

const commaSplit = (hobbies) => hobbies.split(',');

const onFormFilled = (responses) => {
  fs.writeFileSync('./form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const nameField = new Field('name', 'Please enter name', isNameValid);
  const dobField = new Field('dob', 'Please enter dob', isDateValid);
  const hobbiesField = new Field('hobbies', 'Please enter hobbie', areHobbiesValid, commaSplit);
  const phoneNumField = new Field('phoneNumber', 'Please enter phone number', isPhoneNumValid);

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField);

  console.log(form.currentPrompt());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (response) =>
    registerResponse(response.trim(), form, console.log, onFormFilled));
};

main();
