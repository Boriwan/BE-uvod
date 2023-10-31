"use strict";
const UvodMainAbl = require("../../abl/uvod-main-abl.js");

class UvodMainController {
  init(ucEnv) {
    return UvodMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return UvodMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return UvodMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new UvodMainController();
