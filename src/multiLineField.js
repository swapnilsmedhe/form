class MultiLineField {
  #name;
  #prompts;
  #validator;
  #parser;
  #responses;
  #index;

  constructor(name, prompts, validator = () => true, parser = (x) => x) {
    this.#name = name;
    this.#prompts = prompts;
    this.#validator = validator;
    this.#parser = parser;
    this.#responses = [];
    this.#index = 0;
  }

  getPrompt() {
    return this.#prompts[this.#index];
  }

  fill(response) {
    this.#responses.push(response);
    this.#index++;
  }

  getEntry() {
    return { name: this.#name, response: this.#parser(this.#responses) };
  }

  isFilled() {
    return this.#prompts.length === this.#responses.length;
  }

  isValid(response) {
    return this.#validator(response);
  }
}

module.exports = { MultiLineField };
