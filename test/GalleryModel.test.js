const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
const expect = require("chai").expect;
const Gallery = require("../models/Gallery");

describe("Gallery Model Test", () => {
  before(async () => {
    mongoose.connect(mongoDB);
    await Gallery.remove({});
  });
  afterEach(async () => {
    await Gallery.remove({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("Has a module", () => {
    expect(Gallery).not.to.be.undefined;
  });

  describe("Get Gallery", () => {
    it("Gets Gallery by Image", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      const foundGallery = await Gallery.findOne({ image: "Test Url" });
      const expectedImage = "Test Url";
      const actualImage = foundGallery.image;
      expect(actualImage).to.equal(expectedImage);
    });

    it("Gets Gallery by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      const savedGallery = await testGallery.save();
      const foundGallery = await Gallery.findById(savedGallery.id);
      const expectedImage = "Test Url";
      const actualImage = foundGallery.image;
      expect(actualImage).to.equal(expectedImage);
    });
  });

  describe("Save Gallery", () => {
    it("Saves an Gallery", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      const savedGallery = await testGallery.save();
      const expectedImage = "Test Url";
      const actualImage = savedGallery.image;
      expect(actualImage).to.equal(expectedImage);
    });
  });

  describe("Update Gallery", () => {
    it("Update an Gallery's Image", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      testGallery.image = "Updated Image";
      const savedGallery = await testGallery.save();
      const expectedImage = "Updated Image";
      const actualImage = savedGallery.image;
      expect(actualImage).to.equal(expectedImage);
    });

    it("Update an Gallery's Image by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      const foundGallery = await Gallery.findById(testGallery.id);
      foundGallery.image = "Updated Image";
      const savedGallery = await foundGallery.save();
      const expectedImage = "Updated Image";
      const actualImage = savedGallery.image;
      expect(actualImage).to.equal(expectedImage);
    });
  });

  describe("Delete Gallery", () => {
    it("Delete an Gallery by Image", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      await testGallery.save();
      await Gallery.deleteOne({ Image: "Test Url" });
      const deletedGallery = await Gallery.findOne({ Image: "Test Url" });
      expect(deletedGallery).to.be.null;
    });

    it("Delete an Gallery by ID", async () => {
      const testGallery = new Gallery({
        image: "Test Url"
      });
      const savedGallery = await testGallery.save();
      await Gallery.findByIdAndDelete(savedGallery.id);
      const deletedGallery = await Gallery.findById(savedGallery.id);
      expect(deletedGallery).to.be.null;
    });
  });
});
