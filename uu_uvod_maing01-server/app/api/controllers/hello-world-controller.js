"use strict";

const helloWorldAbl = require("../../abl/hello-world-abl");

class HelloWorldController {
  greeting(ucEnv) {
    return helloWorldAbl.greeting(ucEnv.getSession().getIdentity().getName(), ucEnv.getDtoIn());
  }
}

module.exports = new HelloWorldController();
