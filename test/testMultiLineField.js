const { MultiLineField } = require('../src/multiLineField.js');
const assert = require('assert');

describe('multiLineField', () => {
  it('should give the prompt of current field', () => {
    const prompts = ['enter name'];
    const multLineField = new MultiLineField('name', prompts);

    assert.strictEqual(multLineField.getPrompt(), 'enter name');
  });

  it('should give entries of fields', () => {
    const prompts = ['enter first name', 'enter last name'];

    const multiLineField = new MultiLineField('name', prompts);
    multiLineField.fill('joe');
    multiLineField.fill('root');

    assert.deepStrictEqual(multiLineField.getEntry(), {
      name: 'name', response: ['joe', 'root']
    });
  });

  it('should give parse responses when a parser is provided', () => {
    const prompts = ['enter first name', 'enter last name'];

    const commaJoin = (contents) => contents.join(',');
    const alwaysTrue = () => true;

    const multiLineField = new MultiLineField('name', prompts, alwaysTrue, commaJoin);

    multiLineField.fill('kevin');
    multiLineField.fill('peterson');

    assert.deepStrictEqual(multiLineField.getEntry(), {
      name: 'name', response: 'kevin,peterson'
    });
  });

  it('should return false if all fields are not filled', () => {
    const prompts = ['enter first name', 'enter last name'];

    const multiLineField = new MultiLineField('name', prompts);
    multiLineField.fill('joe');

    assert.ok(!multiLineField.isFilled());
  });

  it('should return true if all fields are filled', () => {
    const prompts = ['enter first name', 'enter last name'];

    const multiLineField = new MultiLineField('name', prompts);
    multiLineField.fill('jason');
    multiLineField.fill('roy');

    assert.ok(multiLineField.isFilled());
  });
});