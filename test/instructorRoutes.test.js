// Import the dependencies for testing
// const chai = require("chai");
// const chaiHttp = require("chai-http");
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const Instructor = require("../models/Instructor");

describe("Instructor Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Instructor.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await Instructor.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /instructor", () => {
    it("Should get all Instructor", async () => {
      await request(server)
        .get("/instructor")
        .expect(200);
    });

    it("Should get a single Instructor by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      const foundInstructor = await Instructor.findOne({ name: "Test Name" });
      await request(server)
        .get(`/instructor/${foundInstructor.id}`)
        .expect(200);
    });
  });

  describe("POST /instructor/new", () => {
    it("Should be able to post Instructor", async () => {
      await request(server)
        .post("/instructor/new")
        .send({
          name: "Test Name",
          description: "Test Description",
          faculty: "Test Faculty"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post Instructor if name is missing in body", async () => {
      await request(server)
        .post("/instructor/new")
        .send({
          description: "Test Description",
          faculty: "Test Faculty"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /instructor/:id", async () => {
    it("Should be able to update Instructor name by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      const foundInstructor = await Instructor.findOne({ name: "Test Name" });
      await request(server)
        .put(`/instructor/${foundInstructor.id}`)
        .send({ name: "hello" })
        .expect(200);

      const updatedInstructor = await Instructor.findById(foundInstructor.id);
      expect(updatedInstructor.name).to.equal("hello");
    });
  });

  describe("DELETE /instructor/:id", async () => {
    it("Should be able to delete a Instructor by ID", async () => {
      const testInstructor = new Instructor({
        name: "Test Name",
        description: "Test Description",
        faculty: "Test Faculty"
      });
      await testInstructor.save();
      const foundInstructor = await Instructor.findOne({ name: "Test Name" });
      await request(server)
        .delete(`/instructor/${foundInstructor.id}`)
        .expect(200);

      const deletedInstructor = await Instructor.findById(foundInstructor.id);
      expect(deletedInstructor).to.equal(null);
    });
  });
});
