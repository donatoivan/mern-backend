// Import the dependencies for testing
// const chai = require("chai");
// const chaiHttp = require("chai-http");
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const About = require("../models/About");

describe("About Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await About.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await About.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /about", () => {
    it("Should get all About", async () => {
      await request(server)
        .get("/about")
        .expect(200);
    });

    it("Should get a single About by ID", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      await testAbout.save();
      const foundAbout = await About.findOne({
        description: "Testing Description"
      });
      await request(server)
        .get(`/about/${foundAbout.id}`)
        .expect(200);
    });
  });

  describe("POST /about/new", () => {
    it("Should be able to post About", async () => {
      await request(server)
        .post("/about/new")
        .send({
          description: "Testing Description"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post About if description is missing in body", async () => {
      await request(server)
        .post("/about/new")
        .send({})
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /about/:id", async () => {
    it("Should be able to update About name by ID", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      await testAbout.save();
      const foundAbout = await About.findOne({
        description: "Testing Description"
      });
      await request(server)
        .put(`/about/${foundAbout.id}`)
        .send({ description: "hello" })
        .expect(200);

      const updatedAbout = await About.findById(foundAbout.id);
      expect(updatedAbout.description).to.equal("hello");
    });
  });

  describe("DELETE /about/:id", async () => {
    it("Should be able to delete a About by ID", async () => {
      const testAbout = new About({
        description: "Testing Description"
      });
      await testAbout.save();
      const foundAbout = await About.findOne({
        description: "Testing Description"
      });
      await request(server)
        .delete(`/about/${foundAbout.id}`)
        .expect(200);

      const deletedAbout = await About.findById(foundAbout.id);
      expect(deletedAbout).to.equal(null);
    });
  });
});
