class Field {
  #name;
  #prompt;
  #response;
  #validator;
  #parser;
  constructor(name, prompt, validator = () => true, parser = (x) => x) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  getPrompt() {
    return this.#prompt;
  }

  fill(response) {
    this.#response = response;
  }

  getEntry() {
    return { name: this.#name, response: this.#parser(this.#response) };
  }

  isFilled() {
    return this.#response !== null;
  }

  isValid(response) {
    return this.#validator(response);
  }
}

module.exports = { Field };
