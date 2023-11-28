"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/helloworld-error.js");
const { Schemas, Profiles } = require("../constants.js");
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { GreetStates } = require("../constants.js");
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { UriBuilder } = require("uu_appg01_server").Uri;
const AppClient = require("uu_appg01_server").AppClient;

const WARNINGS = {
  greetingUnsupportedKeys: {
    code: `${Errors.Greeting.UC_CODE}unsupportedKeys`,
  },
};

const logger = LoggerFactory.get("helloworld.Abls.HelloWorldAbl");

class HelloWorldAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.GREET);
    this.daoCategory = DaoFactory.getDao(Schemas.CATEGORY);
  }

  async greeting(userName, dtoIn, session) {
    //logger
    logger.debug("ABL - greeting - debug: " + userName);
    logger.warn("ABL - greeting - warning: " + userName);

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

    const uuIdmBaseUri = "https://uuapp-dev.plus4u.net/uu-identitymanagement-maing01/58ceb15c275c4b31bfe0fc9768aa6a9c";
    const uuIdmPersonIdentityLoadUri = UriBuilder.parse(uuIdmBaseUri).setUseCase("uuPersonIdentity/load");
    const personIdentityLoadDtoIn = {
      uuIdentity: session.getIdentity().getUuIdentity(),
    };
    logger.debug(JSON.stringify(session.getIdentity().getUuIdentity()));
    let personIdentityLoadDtoOut;
    try {
      personIdentityLoadDtoOut = await AppClient.cmdGet(uuIdmPersonIdentityLoadUri, personIdentityLoadDtoIn, {
        session,
      });
    } catch (e) {
      // throw new Errors.CreateOnBehalf.CallIdmFailed({ uuAppErrorMap }, e);
      throw e;
    }
    const type = personIdentityLoadDtoOut.type;

    return {
      messageA: message,
      dtoIn,
      type: type,
      personIdentityLoadDtoOut,
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

  async greetCreate(awid, dtoIn, identity) {
    // HDS 1
    let validationResult = this.validator.validate("helloWorldGreetCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.greetingUnsupportedKeys.code,
      Errors.Greeting.InvalidDtoIn
    );

    // validation of categories
    if (dtoIn.category) {
      try {
        let categoryList = await this.daoCategory.list(awid, dtoIn.category);
        if (categoryList.length < dtoIn.category.length) {
          // TODO: handle warning message to uuAppErrorMap
        }
        dtoIn.category = categoryList.itemList.map((category) => category.id);
      } catch (e) {
        // TODO: error report
        throw e;
      }
    }
    dtoIn.awid = awid;
    dtoIn.owner = identity.getUuIdentity();
    dtoIn.state = GreetStates.CONSTRUCT;
    dtoIn.history = [];

    let createdGreet = null;

    try {
      createdGreet = await this.dao.create(dtoIn);
    } catch (e) {
      // TODO: error report
      throw e;
    }
    return {
      ...createdGreet,
      uuAppErrorMap,
    };
  }
}

module.exports = new HelloWorldAbl();
