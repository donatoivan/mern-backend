const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;
const Tuition = require("../models/Tuition");

describe("Tuition Model Test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await Tuition.remove({});
  });
  afterEach(async () => {
    await Tuition.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(Tuition).not.to.be.undefined;
  });

  describe("Get Tuition", () => {
    it("Gets Tuition by Name", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      const foundTuition = await Tuition.findOne({ name: "Test Name" });
      const expectedName = "Test Name";
      const actualName = foundTuition.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Gets Tuition by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      const savedTuition = await testTuition.save();
      const foundTuition = await Tuition.findById(savedTuition.id);
      const expectedName = "Test Name";
      const actualName = foundTuition.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Save Tuition", () => {
    it("Saves a Tuition", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      const savedTuition = await testTuition.save();
      const expectedName = "Test Name";
      const actualName = savedTuition.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Update Tuition", () => {
    it("Update a Tuition's Name", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      testTuition.name = "Updated Name";
      const savedTuition = await testTuition.save();
      const expectedName = "Updated Name";
      const actualName = savedTuition.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Update a Tuition's Name by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      const foundTuition = await Tuition.findById(testTuition.id);
      foundTuition.name = "Updated Name";
      const savedTuition = await foundTuition.save();
      const expectedName = "Updated Name";
      const actualName = savedTuition.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Delete Tuition", () => {
    it("Delete a Tuition by Name", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      await Tuition.deleteOne({ name: "Test Name" });
      const deletedTuition = await Tuition.findOne({ name: "Test Name" });
      expect(deletedTuition).to.be.null;
    });

    it("Delete a Tuition by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      const savedTuition = await testTuition.save();
      await Tuition.findByIdAndDelete(savedTuition.id);
      const deletedTuition = await Tuition.findById(savedTuition.id);
      expect(deletedTuition).to.be.null;
    });
  });
});
