const fs = require('fs');

const writeToJson = (inputs, fileName) => {
  const userInfo = {};
  userInfo.name = inputs[0];
  userInfo.dob = inputs[1];
  userInfo.hobbies = inputs[2].split(',');
  fs.writeFileSync(fileName, JSON.stringify(userInfo), 'utf8');
};

const readInput = (callback, fileName, messages) => {
  let index = 0;
  const inputs = [];
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    inputs.push(chunk.slice(0, -1));
    console.log(messages[index]);
    index++;
  });
  process.stdin.on('end', () => {
    callback(inputs, fileName);
  });
};

const main = () => {
  const messages = ['Please enter your DOB', 'Please enter your hobbies', 'Thank you'];
  console.log('Please enter your name');
  readInput(writeToJson, './userInfo.json', messages);
};

main();
