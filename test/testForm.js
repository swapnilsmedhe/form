const assert = require('assert');
const { Form, registerResponse } = require("../src/form");

describe('registerResponse', () => {
  it('should print next prompt', () => {
    const content = [];
    const logger = (text) => content.push(text);
    const identity = (arg) => arg

    const form = new Form();
    form.addField('name', 'enter name', identity, identity);
    form.addField('dob', 'enter dob', identity, identity);

    registerResponse('james', form, logger);
    assert.deepStrictEqual(content, ['enter dob']);
  });

  it('should provide filled form when all responses registered', () => {
    const identity = (arg) => arg

    let actual;
    const onFormFilled = (responses) => actual = responses;

    const form = new Form();
    form.addField('name', 'enter name', identity, identity);

    registerResponse('james', form, identity, onFormFilled)
    assert.deepStrictEqual(actual, { name: 'james' });
  });
});
