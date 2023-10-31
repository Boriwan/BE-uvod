const { TestHelper } = require("uu_appg01_server-test");

beforeAll(async () => {
  await TestHelper.setup();
});

beforeEach(async () => {
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});

afterEach(async () => {
  await TestHelper.dropDatabase();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Testing the helloworld greeting uuCmd...", () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    let dtoIn = {
      greeting: "No nazdar",
      sufix: "ty starý pardále",
    };
    let result = await TestHelper.executeGetCommand("helloworld/greeting", dtoIn, session);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
  test("Test - invalidDtoIn", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    let dtoIn = { greeting: "No nazdar", hodnota: "hodnota" };
    try {
      await TestHelper.executeGetCommand("helloworld/greeting", dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toBeDefined();
      expect(e.code).toEqual("uu-uvod-main/greeting/invalidDtoIn");
    }
  });

  test("Test - unsupportedKeys", async () => {
    let session = await TestHelper.login("Authorities", false, false);

    let dtoIn = { greeting: "No nazdar", extraAttribute: "hodnota" };
    let result = await TestHelper.executeGetCommand("helloworld/greeting", dtoIn, session);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    let warning = result.data.uuAppErrorMap["uu-uvod-main/greeting/unsupportedKeys"];
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
    expect(warning.message).toEqual("DtoIn contains unsupported keys.");
    expect(warning.paramMap).toEqual({ unsupportedKeyList: expect.arrayContaining(["$.extraAttribute"]) });
  });
});
