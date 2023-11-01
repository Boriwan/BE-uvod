"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/helloworld-error.js");
const { Schemas, Profiles } = require("../constants.js");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;

const WARNINGS = {
  greetingUnsupportedKeys: {
    code: `${Errors.Greeting.UC_CODE}unsupportedKeys`,
  },
};

class HelloWorldAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.GREET);
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

  async greetList(awid, dtoIn, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("helloWorldGreetListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.greetingUnsupportedKeys.code,
      Errors.Greeting.InvalidDtoIn
    );

    let profiles = authorizationResult.getAuthorizedProfiles();

    let greetList = await this.dao.list(awid);

    return {
      profiles,
      ...greetList,
      uuAppErrorMap,
    };
  }
}

module.exports = new HelloWorldAbl();
