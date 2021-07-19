const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
var Stream = require("stream");
var stream = new Stream();

const util = require("../src/util");

const expect = chai.expect;
chai.use(sinonChai);

describe("Check if getReqData util method returns valid response", () => {
  let req = {};
  beforeEach(() => {
    //Arrange
    req = {
      url: "/api/todo/1/",
      method: "PUT",
      body: JSON.stringify({
        title: "Coding in Javascript",
        description: "Working with functions in JavaScript",
        completed: false,
      }),
      on: sinon.stub().callsFake((event, callback) => {
        if (event === "data") {
          callback(req.body);
        }
        if (event === "end") {
          callback();
        }
        return this;
      }),
    };
  });

  it("Check if both data and end events are listned", async () => {
    //Act
    await util.getReqData(req);
    //Assert
    expect(req.on).to.have.been.calledTwice;
  });
});

describe("Check if getIdParam util method returns valid response", () => {
  it("should return a valid response for a vbalid request", () => {
    //Arrange
    const req = {
      url: "/api/todo/1/",
      method: "PUT",
    };
    //Act
    const value = util.getIdParam(req);
    //Assert
    expect(value).to.be.equal(1);
  });
  it("should return a valid response for a valid request", () => {
    //Arrange
    const req = {
      url: "/api/todo/1/",
      method: "PUT",
    };
    //Act
    const value = util.getIdParam(req);
    //Assert
    expect(value).to.be.equal(1);
  });
});
