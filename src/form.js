class Form {
  #fields;
  #index;
  constructor(...fields) {
    this.#fields = fields;
    this.#index = 0;
  }

  currentPrompt() {
    const field = this.#fields[this.#index];
    return field.getPrompt();
  }

  isValid(response) {
    const field = this.#fields[this.#index];
    return field.isValid(response);
  }

  fillCurrentField(response) {
    const field = this.#fields[this.#index];
    if (!field.isValid(response)) {
      throw new Error('Invalid response');
    }
    field.fill(response);
    this.#index++;
  }

  isFilled() {
    return this.#fields.every((field) => field.isFilled());
  }

  responses() {
    const responses = {};
    this.#fields.forEach((field) => {
      const { name, response } = field.getEntry();
      responses[name] = response;
    });
    return responses;
  }
}

const registerResponse = (response, form, logger, onFormFilled) => {
  try {
    form.fillCurrentField(response);
  } catch (error) {
    logger('Invalid response');
  }
  if (!form.isFilled()) {
    logger(form.currentPrompt());
    return;
  }
  logger('Thank you');
  onFormFilled(form.responses());
};

module.exports = { Form, registerResponse };
