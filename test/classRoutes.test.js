// Import the dependencies for testing
// const chai = require("chai");
// const chaiHttp = require("chai-http");
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const Class = require("../models/Class");

describe("Class Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Class.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await Class.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /class", () => {
    it("Should get all class", async () => {
      await request(server)
        .get("/class")
        .expect(200);
    });

    it("Should get a single class by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      const foundClass = await Class.findOne({ name: "Test Name" });
      await request(server)
        .get(`/class/${foundClass.id}`)
        .expect(200);
    });
  });

  describe("POST /class/new", () => {
    it("Should be able to post class", async () => {
      await request(server)
        .post("/class/new")
        .send({
          name: "Test Name",
          description: "Test Description",
          category: "Test Category",
          image: "Test Url"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post class if name is missing in body", async () => {
      await request(server)
        .post("/class/new")
        .send({
          description: "Test Description",
          category: "Test Category",
          image: "Test Url"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /class/:id", async () => {
    it("Should be able to update Class name by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      const foundClass = await Class.findOne({ name: "Test Name" });
      await request(server)
        .put(`/class/${foundClass.id}`)
        .send({ name: "hello" })
        .expect(200);

      const updatedClass = await Class.findById(foundClass.id);
      expect(updatedClass.name).to.equal("hello");
    });
  });

  describe("DELETE /class/:id", async () => {
    it("Should be able to delete a Class by ID", async () => {
      const testClass = new Class({
        name: "Test Name",
        description: "Test Description",
        category: "Test Category",
        image: "Test Url"
      });
      await testClass.save();
      const foundClass = await Class.findOne({ name: "Test Name" });
      await request(server)
        .delete(`/class/${foundClass.id}`)
        .expect(200);

      const deletedClass = await Class.findById(foundClass.id);
      expect(deletedClass).to.equal(null);
    });
  });
});
