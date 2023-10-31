"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/helloworld-error.js");

const WARNINGS = {
  greetingUnsupportedKeys: {
    code: `${Errors.Greeting.UC_CODE}unsupportedKeys`,
  },
};

class HelloWorldAbl {
  constructor() {
    this.validator = Validator.load();
  }

  greeting(userName, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("helloWorldGreetingDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.greetingUnsupportedKeys.code,
      Errors.Greeting.InvalidDtoIn
    );

    let message = dtoIn.greeting + " " + userName;
    if (dtoIn.sufix) {
      message += " " + dtoIn.sufix;
    }
    return {
      messageA: message,
      dtoIn,
      uuAppErrorMap,
    };
  }
}

module.exports = new HelloWorldAbl();
