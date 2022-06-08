class Form {
  #fields;
  #index;
  #formDetails;
  constructor() {
    this.#fields = [];
    this.#index = 0;
    this.#formDetails = {};
  }

  addField(name, query, validator, formatter) {
    this.#fields.push({ name, query, validator, formatter });
  }

  query() {
    const { query } = this.#fields[this.#index];
    return query;
  }

  isValid(input) {
    const { validator } = this.#fields[this.#index];
    return validator(input);
  }

  register(input) {
    const { name, formatter } = this.#fields[this.#index];
    this.#formDetails[name] = formatter(input);
  }

  nextField() {
    this.#index++;
    if (this.areFieldsOver()) {
      return;
    }
    const { name } = this.#fields[this.#index];
    return name;
  }

  areFieldsOver() {
    return this.#index >= this.#fields.length;
  }

  getFormDetails() {
    return this.#formDetails;
  }
}

const registerResponse = (response, form, logger, onFormfilled) => {
  if (form.isValid(response)) {
    form.register(response);
    form.nextField();
  }
  if (!form.areFieldsOver()) {
    logger(form.query());
    return;
  }
  logger('Thank you');
  onFormfilled(form.getFormDetails());
};

module.exports = { Form, registerResponse };
