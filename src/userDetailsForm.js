const { Field } = require('./field.js');
const { Form } = require('./form.js');
const { MultiLineField } = require('./multiLineField.js');

const areAllAlphabets = (string) => {
  return /^[a-z]+$/.test(string);
};

const areAllDigits = (string) => {
  return /^\d+$/.test(string);
};

const validateName = (name) => {
  return name.length > 4 && areAllAlphabets(name);
};

const validateDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

const validateHobbies = (hobbies) => hobbies.length > 0;

const validatePhoneNum = (phoneNumber) => {
  return phoneNumber.length === 10 && areAllDigits(phoneNumber);
};

const validateAddress = (address) => address.length > 0;

const commaSplit = (hobbies) => hobbies.split(',');

const joinByNewline = (contents) => contents.join('\n');

const createForm = () => {
  const nameField = new Field('name', 'Enter name', validateName);
  const dobField = new Field('dob', 'Enter dob', validateDate);

  const hobbiesField = new Field('hobbies', 'Enter hobbies', validateHobbies,
    commaSplit);

  const phoneNumField = new Field('phoneNumber', 'Enter phone number',
    validatePhoneNum);

  const prompts = ['Enter address line 1', 'Enter address line 2'];

  const addressField = new MultiLineField('address', prompts, validateAddress,
    joinByNewline);

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField, addressField);
  return form;
};

module.exports = { createForm };
