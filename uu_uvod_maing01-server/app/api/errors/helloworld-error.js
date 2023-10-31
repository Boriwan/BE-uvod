"use strict";
const HelloWorldUseCaseError = require("./uvod-main-use-case-error.js");

const Greeting = {
  UC_CODE: `${HelloWorldUseCaseError.ERROR_PREFIX}greeting/`,

  InvalidDtoIn: class extends HelloWorldUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Greeting.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  Greeting,
};
