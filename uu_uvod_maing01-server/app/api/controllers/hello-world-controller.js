"use strict";

const helloWorldAbl = require("../../abl/hello-world-abl");

class HelloWorldController {
  greeting(ucEnv) {
    return helloWorldAbl.greeting(ucEnv.getSession().getIdentity().getName(), ucEnv.getDtoIn());
  }
  greetList(ucEnv) {
    return helloWorldAbl.greetList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }
  greetCreate(ucEnv) {
    return helloWorldAbl.greetCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession().getIdentity());
  }
}

module.exports = new HelloWorldController();
