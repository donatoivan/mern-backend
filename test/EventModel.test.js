const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;
const Event = require("../models/Event");

describe("Event Model Test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await Event.remove({});
  });
  afterEach(async () => {
    await Event.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(Event).not.to.be.undefined;
  });

  describe("Get Event", () => {
    it("Gets Event by Name", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      const foundEvent = await Event.findOne({ name: "Test Name" });
      const expectedName = "Test Name";
      const actualName = foundEvent.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Gets Event by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      const savedEvent = await testEvent.save();
      const foundEvent = await Event.findById(savedEvent.id);
      const expectedName = "Test Name";
      const actualName = foundEvent.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Save Event", () => {
    it("Saves an Event", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      const savedEvent = await testEvent.save();
      const expectedName = "Test Name";
      const actualName = savedEvent.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Update Event", () => {
    it("Update an Event's Name", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      testEvent.name = "Updated Name";
      const savedEvent = await testEvent.save();
      const expectedName = "Updated Name";
      const actualName = savedEvent.name;
      expect(actualName).to.equal(expectedName);
    });

    it("Update an Event's Name by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      const foundEvent = await Event.findById(testEvent.id);
      foundEvent.name = "Updated Name";
      const savedEvent = await foundEvent.save();
      const expectedName = "Updated Name";
      const actualName = savedEvent.name;
      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Delete Event", () => {
    it("Delete an Event by Name", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      await Event.deleteOne({ name: "Test Name" });
      const deletedEvent = await Event.findOne({ name: "Test Name" });
      expect(deletedEvent).to.be.null;
    });

    it("Delete an Event by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      const savedEvent = await testEvent.save();
      await Event.findByIdAndDelete(savedEvent.id);
      const deletedEvent = await Event.findById(savedEvent.id);
      expect(deletedEvent).to.be.null;
    });
  });
});
