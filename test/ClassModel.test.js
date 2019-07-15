const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;
const Class = require("../models/Class");

describe("Class Model Test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await Class.remove({});
  });
  afterEach(async () => {
    await Class.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(Class).not.to.be.undefined;
  });

  describe("Get Class", () => {
    it("Gets Class by Name", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      const foundClass = await Class.findOne({ name: "Test Name" });
      const expectedName = "Test Name";
      const actualName = foundClass.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Gets Class by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });

      const savedClass = await testClass.save();
      const foundClass = await Class.findById(savedClass.id);
      const expectedName = "Test Name";
      const actualName = foundClass.name;

      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Save Class", () => {
    it("Saves a Class", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      const savedClass = await testClass.save();
      const expectedName = "Test Name";
      const actualName = savedClass.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Update Class", () => {
    it("Update a Class's Name", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      testClass.name = "Updated Name";
      const savedClass = await testClass.save();
      const expectedName = "Updated Name";
      const actualName = savedClass.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Update a Class's Name by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      const foundClass = await Class.findById(testClass.id);
      foundClass.name = "Updated Name";
      const savedClass = await foundClass.save();
      const expectedName = "Updated Name";
      const actualName = savedClass.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Delete Class", () => {
    it("Delete a Class by Name", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      await Class.deleteOne({ name: "Test Name" });
      const deletedClass = await Class.findOne({ name: "Test Name" });
      expect(deletedClass).to.be.null;
    });

    it("Delete a Class by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      const savedClass = await testClass.save();
      await Class.findByIdAndDelete(savedClass.id);
      const deletedClass = await Class.findById(savedClass.id);
      expect(deletedClass).to.be.null;
    });
  });
});
