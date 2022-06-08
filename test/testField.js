const assert = require('assert');
const { Field } = require('../src/field.js');

const alwaysTrue = (arg) => true;

describe('field', () => {
  it('should validate the field according to the given validator', () => {
    const field = new Field('name', 'enter name', alwaysTrue);
    assert.ok(field.isValid('andrew'));
  });

  it('should parse the response according to the given parser', () => {
    const commaSplit = (text) => text.split(',');
    const field = new Field('hobbies', 'enter hobbies', alwaysTrue, commaSplit);
    field.fill('singing,dancing')

    assert.deepStrictEqual(field.getEntry(), {
      name: 'hobbies', response: ['singing', 'dancing']
    });
  });
});
