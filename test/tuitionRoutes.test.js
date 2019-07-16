// Import the dependencies for testing
// const chai = require("chai");
// const chaiHttp = require("chai-http");
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const Tuition = require("../models/Tuition");

describe("Tuition Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Tuition.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await Tuition.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /tuition", () => {
    it("Should get all Tuition", async () => {
      await request(server)
        .get("/tuition")
        .expect(200);
    });

    it("Should get a single Tuition by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      const foundTuition = await Tuition.findOne({ name: "Test Name" });
      await request(server)
        .get(`/tuition/${foundTuition.id}`)
        .expect(200);
    });
  });

  describe("POST /tuition/new", () => {
    it("Should be able to post Tuition", async () => {
      await request(server)
        .post("/tuition/new")
        .send({
          name: "Test Name",
          description: "Test Description",
          category: "Test Category",
          image: "Test Image"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post Tuition if name is missing in body", async () => {
      await request(server)
        .post("/tuition/new")
        .send({
          description: "Test Description",
          category: "Test Category",
          image: "Test Image"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /tuition/:id", async () => {
    it("Should be able to update Tuition name by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      const foundTuition = await Tuition.findOne({ name: "Test Name" });
      await request(server)
        .put(`/tuition/${foundTuition.id}`)
        .send({ name: "hello" })
        .expect(200);

      const updatedTuition = await Tuition.findById(foundTuition.id);
      expect(updatedTuition.name).to.equal("hello");
    });
  });

  describe("DELETE /tuition/:id", async () => {
    it("Should be able to delete a Tuition by ID", async () => {
      const testTuition = new Tuition({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Image"
      });
      await testTuition.save();
      const foundTuition = await Tuition.findOne({ name: "Test Name" });
      await request(server)
        .delete(`/tuition/${foundTuition.id}`)
        .expect(200);

      const deletedTuition = await Tuition.findById(foundTuition.id);
      expect(deletedTuition).to.equal(null);
    });
  });
});
