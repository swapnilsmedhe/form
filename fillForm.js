const fs = require('fs');
const { registerResponse } = require('./src/form.js');
const { createForm } = require('./src/userDetailsForm.js');

const onFormFilled = (responses) => {
  fs.writeFileSync('./form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const form = createForm();

  console.log(form.currentPrompt());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (response) =>
    registerResponse(response.trim(), form, console.log, onFormFilled));
};

main();
