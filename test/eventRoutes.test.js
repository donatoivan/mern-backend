// Import the dependencies for testing
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const Event = require("../models/Event");

describe("Event Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Event.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await Event.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /event", () => {
    it("Should get all events", async () => {
      await request(server)
        .get("/event")
        .expect(200);
    });

    it("Should get a single event by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      const foundEvent = await Event.findOne({ name: "Test Name" });
      await request(server)
        .get(`/event/${foundEvent.id}`)
        .expect(200);
    });
  });

  describe("POST /event/new", () => {
    it("Should be able to post Event", async () => {
      await request(server)
        .post("/event/new")
        .send({
          name: "Test Name",
          description: "Test Description",
          image: "Test Url"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post Event if name is missing in body", async () => {
      await request(server)
        .post("/event/new")
        .send({
          description: "Test Description",
          image: "Test Url"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /event/:id", async () => {
    it("Should be able to update Event name by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      const foundEvent = await Event.findOne({ name: "Test Name" });
      await request(server)
        .put(`/event/${foundEvent.id}`)
        .send({ name: "hello" })
        .expect(200);

      const updatedEvent = await Event.findById(foundEvent.id);
      expect(updatedEvent.name).to.equal("hello");
    });
  });

  describe("DELETE /event/:id", async () => {
    it("Should be able to delete a Event by ID", async () => {
      const testEvent = new Event({
        name: "Test Name",
        description: "Test Description",
        image: "Test Url"
      });
      await testEvent.save();
      const foundEvent = await Event.findOne({ name: "Test Name" });
      await request(server)
        .delete(`/event/${foundEvent.id}`)
        .expect(200);

      const deletedEvent = await Event.findById(foundEvent.id);
      expect(deletedEvent).to.equal(null);
    });
  });
});
