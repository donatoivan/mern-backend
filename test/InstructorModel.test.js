const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;
const Instructor = require("../models/Instructor");

describe("Instructor Model Test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await Instructor.remove({});
  });
  afterEach(async () => {
    await Instructor.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(Instructor).not.to.be.undefined;
  });

  describe("Get Instructor", () => {
    it("Gets Instructor by Name", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      const foundInstructor = await Instructor.findOne({ name: "Test Name" });
      const expectedName = "Test Name";
      const actualName = foundInstructor.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Gets Instructor by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      const savedInstructor = await testInstructor.save();
      const foundInstructor = await Instructor.findById(savedInstructor.id);
      const expectedName = "Test Name";
      const actualName = foundInstructor.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Save Instructor", () => {
    it("Saves an Instructor", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      const savedInstructor = await testInstructor.save();
      const expectedName = "Test Name";
      const actualName = savedInstructor.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Update Instructor", () => {
    it("Update an Instructor's Name", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      testInstructor.name = "Updated Name";
      const savedInstructor = await testInstructor.save();
      const expectedName = "Updated Name";
      const actualName = savedInstructor.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Update an Instructor's Name by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      const foundInstructor = await Instructor.findById(testInstructor.id);
      foundInstructor.name = "Updated Name";
      const savedInstructor = await foundInstructor.save();
      const expectedName = "Updated Name";
      const actualName = savedInstructor.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Delete Instructor", () => {
    it("Delete an Instructor by Name", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      await Instructor.deleteOne({ name: "Test Name" });
      const deletedInstructor = await Instructor.findOne({ name: "Test Name" });
      expect(deletedInstructor).to.be.null;
    });

    it("Delete an Instructor by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      const savedInstructor = await testInstructor.save();
      await Instructor.findByIdAndDelete(savedInstructor.id);
      const deletedInstructor = await Instructor.findById(savedInstructor.id);
      expect(deletedInstructor).to.be.null;
    });
  });
});
