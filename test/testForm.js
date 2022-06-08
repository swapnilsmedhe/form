const assert = require('assert');
const { Field } = require('../src/field');
const { Form, registerResponse } = require('../src/form.js');

const nameValidator = (name) => name.length > 4;

describe('form', () => {
  it('should give the prompt of current field', () => {
    const nameField = new Field('name', 'enter name');
    const form = new Form(nameField);

    assert.strictEqual(form.currentPrompt(), 'enter name');
  });

  it('should provide all responses', () => {
    const nameField = new Field('name', 'enter name');
    const form = new Form(nameField);
    form.fillCurrentField('james')

    assert.deepStrictEqual(form.responses(), { name: 'james' });
  });

  it('should return true when all field are filled', () => {
    const dobField = new Field('dob', 'enter dob');
    const form = new Form(dobField);
    form.fillCurrentField('1234-56-78');
    assert.ok(form.isFilled());
  });

  it('should return false if given response is invalid', () => {
    const nameField = new Field('name', 'enter name', nameValidator);
    const form = new Form(nameField);
    assert.ok(!form.isValid('sky'));
  });

  it('should throw an error if response is invalid', () => {
    const nameField = new Field('name', 'enter name', nameValidator);

    const form = new Form(nameField);
    assert.throws(() => form.fillCurrentField('joe'), {
      message: 'Invalid response'
    });
  });
});

describe('registerResponse', () => {
  it('should print next prompt', () => {
    const content = [];
    const logger = (text) => content.push(text);

    const nameField = new Field('name', 'enter name');
    const dobField = new Field('dob', 'enter dob');
    const form = new Form(nameField, dobField);

    registerResponse('james', form, logger);
    assert.deepStrictEqual(content, ['enter dob']);
  });

  it('should provide filled form when all responses registered', () => {
    const identity = (arg) => arg

    let actual;
    const onFormFilled = (responses) => actual = responses;

    const nameField = new Field('name', 'enter name');
    const form = new Form(nameField);

    registerResponse('james', form, identity, onFormFilled)
    assert.deepStrictEqual(actual, { name: 'james' });
  });

  it('should not fill the field if provided response is invalid', () => {
    const contents = [];
    const logger = (text) => contents.push(text);

    const nameField = new Field('name', 'enter name', nameValidator);

    const form = new Form(nameField);
    registerResponse('joe', form, logger);

    assert.deepStrictEqual(contents, ['Invalid response', 'enter name']);
  });
});
