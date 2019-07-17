// Import the dependencies for testing
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const Gallery = require("../models/Gallery");

describe("Gallery Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Gallery.remove({});
    server = app.listen(3001);
  });

  afterEach(async () => {
    await Gallery.remove({});
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /gallery", () => {
    it("Should get all galleries", async () => {
      await request(server)
        .get("/gallery")
        .expect(200);
    });

    it("Should get a single Gallery by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      const foundGallery = await Gallery.findOne({ image: "Test Url" });
      await request(server)
        .get(`/gallery/${foundGallery.id}`)
        .expect(200);
    });
  });

  describe("POST /gallery/new", () => {
    it("Should be able to post Gallery", async () => {
      await request(server)
        .post("/gallery/new")
        .send({
          image: "Test Url"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should fail to post Gallery if image is missing in body", async () => {
      await request(server)
        .post("/gallery/new")
        .send({})
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("PUT /gallery/:id", async () => {
    it("Should be able to update Gallery name by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      const foundGallery = await Gallery.findOne({ image: "Test Url" });
      await request(server)
        .put(`/gallery/${foundGallery.id}`)
        .send({ image: "hello" })
        .expect(200);

      const updatedGallery = await Gallery.findById(foundGallery.id);
      expect(updatedGallery.image).to.equal("hello");
    });
  });

  describe("DELETE /gallery/:id", async () => {
    it("Should be able to delete a Gallery by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      const foundGallery = await Gallery.findOne({ image: "Test Url" });
      await request(server)
        .delete(`/gallery/${foundGallery.id}`)
        .expect(200);

      const deletedGallery = await Gallery.findById(foundGallery.id);
      expect(deletedGallery).to.equal(null);
    });
  });
});
