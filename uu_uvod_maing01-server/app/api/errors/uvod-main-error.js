"use strict";
const UvodMainUseCaseError = require("./uvod-main-use-case-error.js");

const Init = {
  UC_CODE: `${UvodMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends UvodMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends UvodMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends UvodMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends UvodMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  UvodDaoCreateFailed: class extends UvodMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}uvodDaoCreateFailed`;
      this.message = "Create uvod by DAO method failed";
    }
  }
};

module.exports = {
  Init,
};
