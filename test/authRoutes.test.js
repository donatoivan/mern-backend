var expect = require("chai").expect;
var app = require("../app");
const mongoose = require("mongoose");
var request = require("supertest");

//let's set up the data we need to pass to the login method
const userCredentials = {
  email: "sponge@bob.com",
  password: "garyTheSnail"
};
//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);

describe("Auth Routes", () => {
  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/Ballarat_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    server = app.listen(3001);
    authenticatedUser
      .post("/admin/login")
      .send(userCredentials)
      .end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect("Location", "/");
        done();
      });
  });
  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });
});

//this test says: make a POST to the /login route with the email: sponge@bob.com, password: garyTheSnail
//after the POST has completed, make sure the status code is 200
//also make sure that the user has been directed to the /home page
