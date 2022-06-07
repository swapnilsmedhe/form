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
  const fields = [
    {
      name: 'name', query: 'Please enter your name',
      validator: isNameValid, transformer: identity
    },
    {
      name: 'dob', query: 'Please enter your dob',
      validator: isDateValid, transformer: identity
    },
    {
      name: 'hobbies', query: 'Please enter your hobbies',
      validator: areHobbiesValid, transformer: splitHobbies
    },
    {
      name: 'phoneNumber', query: 'Please enter your phone number',
      validator: isPhoneNumValid, transformer: identity
    },
    {
      name: 'address', query: 'Please enter your address line 1',
      validator: isAddressValid, transformer: identity
    },
    {
      name: 'address', query: 'Please enter your address line 2',
      validator: isAddressValid, transformer: identity
    }
  ]
  const form = new Form(fields);
  readInput(form, fillForm, writeToJson, './userInfo.json');
};

main();
