const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;

const About = require("../models/About");

describe("About model test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await About.remove({});
  });
  afterEach(async () => {
    await About.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(About).not.to.be.undefined;
  });

  describe("Get About", () => {
    it("Gets About by Description", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      await testAbout.save();

      const foundAbout = await About.findOne({
        description: "Testing Description"
      });
      const expectedDescription = "Testing Description";
      const actualDescription = foundAbout.description;
      expect(actualDescription).to.equal(expectedDescription);
    });
  });

  describe("Save About", () => {
    it("Saves About", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      const savedAbout = await testAbout.save();

      const expectedDescription = "Testing Description";
      const actualDescription = savedAbout.description;

      expect(actualDescription).to.equal(expectedDescription);
    });
  });

  describe("Update About", () => {
    it("Updates About Description", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      const savedAbout = await testAbout.save();
      const foundAbout = await About.findOne({
        description: "Testing Description"
      });
      foundAbout.description = "Hello";
      const updatedAbout = await foundAbout.save();
      const expectedDescription = "Hello";
      const actualDescription = updatedAbout.description;

      expect(actualDescription).to.equal(expectedDescription);
    });
  });
});
