"use strict";

const helloWorldAbl = require("../../abl/hello-world-abl");
const { LoggerFactory } = require("uu_appg01_server").Logging;

const logger = LoggerFactory.get("helloworld.Controllers.HelloWorldController");

class HelloWorldController {
  greeting(ucEnv) {
    //logger
    logger.debug("Controller - greeting - debug: " + JSON.stringify(ucEnv.getSession().getIdentity()));
    logger.warn("Controller - greeting - warning: " + JSON.stringify(ucEnv.getSession().getIdentity()));

    return helloWorldAbl.greeting(ucEnv.getSession().getIdentity().getName(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  greetList(ucEnv) {
    return helloWorldAbl.greetList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }
  greetCreate(ucEnv) {
    return helloWorldAbl.greetCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession().getIdentity());
  }
}

module.exports = new HelloWorldController();
