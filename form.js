class Form {
  #fields;
  #queries;
  #validators;
  #index;
  #formDetails;
  constructor(fields, queries, validators) {
    this.#fields = fields;
    this.#queries = queries;
    this.#validators = validators;
    this.#index = 0;
    this.#formDetails = {};
  }

  query() {
    return this.#queries[this.#index];
  }

  validate(input) {
    const validator = this.#validators[this.#index];
    return validator(input)
  }

  register(input) {
    const field = this.#fields[this.#index];
    this.#formDetails[field] = input;
  }

  nextField() {
    this.#index++;
    return this.#fields[this.#index];
  }

  getFormDetails() {
    return this.#formDetails;
  }
}

exports.Form = Form;
