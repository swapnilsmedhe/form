const assert = require('assert');
const { createForm } = require('../src/userDetailsForm.js');

describe('createForm', () => {
  it('should give prompts of name, dob, hobbies, phNo, address field', () => {
    const form = createForm();

    form.fillCurrentField('peter');
    assert.strictEqual(form.currentPrompt(), 'Enter dob');

    form.fillCurrentField('2000-18-28');
    assert.strictEqual(form.currentPrompt(), 'Enter hobbies');

    form.fillCurrentField('singing,dancing');
    assert.strictEqual(form.currentPrompt(), 'Enter phone number');

    form.fillCurrentField('1234567890');
    assert.strictEqual(form.currentPrompt(), 'Enter address line 1');

    form.fillCurrentField('Eiffel Tower');
    assert.strictEqual(form.currentPrompt(), 'Enter address line 2');
  });

  it('should fill the form with given responses', () => {
    const form = createForm();

    form.fillCurrentField('jason');
    form.fillCurrentField('2993-16-26');
    form.fillCurrentField('cricket,football');
    form.fillCurrentField('1234567890');
    form.fillCurrentField('Eiffel Tower');
    form.fillCurrentField('Paris');

    const expected = {
      name: 'jason',
      dob: '2993-16-26',
      hobbies: ['cricket', 'football'],
      phoneNumber: '1234567890',
      address: 'Eiffel Tower\nParis'
    }
    assert.deepStrictEqual(form.responses(), expected);
  });
});
