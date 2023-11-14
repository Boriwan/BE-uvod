"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class CategoryMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 });
  }
  
  // async listByCategoryList(awid, categoryList) {
  //   let filter = { awid, _id: { $in: categoryList.map((cat) => new ObjectId(cat)) } };
  //   return await super.find(filter);
  // }

  async list(awid, categoryList) {
    let filter = { awid };
    if (categoryList) {
      filter._id = { $in: categoryList.map((cat) => new ObjectId(cat)) };
    }
    return await super.find(filter);
  }
}

module.exports = CategoryMongo;
