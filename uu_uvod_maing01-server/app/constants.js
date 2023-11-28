const Constants = {
  Schemas: {
    UVOD_MAIN: "uvodMain",
    GREET: "greet",
    CATEGORY: "category",
    // TODO: Add other schemas when you configure one in persistance.json and create mongo file for it
  },

  GreetStates: {
    CONSTRUCT: "construct",
    ACTIVE: "active",
    DELETED: "deleted",
  },
  Profiles: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives",
    READERS: "Readers",
  },
};

//@@viewOn:exports
module.exports = Constants;
//@@viewOff:exports
