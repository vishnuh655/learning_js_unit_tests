const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(require("chai-as-promised"));

const util = require("../src/util");

const expect = chai.expect;
chai.use(sinonChai);

const postData = {
  title: "Coding in Javascript",
  description: "Working with functions in JavaScript",
  completed: false,
};

describe("Check if getReqData util method returns valid response", () => {
  let req = {};
  beforeEach(() => {
    //Arrange
    req = {
      url: "/api/todo/1/",
      method: "PUT",
      body: JSON.stringify(postData),
    };
  });

  it("should return the req body", async () => {
    //Arrange
    req.on = sinon.stub().callsFake((event, callback) => {
      if (event === "data") {
        callback(req.body);
      }
      if (event === "end") {
        callback();
      }
      return this;
    });
    //Act
    const data = await util.getReqData(req);
    //Assert
    expect(data).to.be.deep.equal(postData);
  });

  it("should return exception when no data is recieved", () => {
    //Arrange
    req.on = sinon.stub().callsFake((event, callback) => {
      if (event === "data") {
        callback();
      }
      if (event === "end") {
        callback();
      }
      return this;
    });
    //Assert
    // https://www.chaijs.com/plugins/chai-as-promised/
    expect(util.getReqData(req)).to.be.rejectedWith(Error);
  });
});

describe("Check if getIdParam util method returns valid response", () => {
  it("should return a valid response for a valid request", () => {
    const req = {
      url: "/api/todo/1/",
      method: "PUT",
    };
    const value = util.getIdParam(req);
    expect(value).to.be.equal(1);
  });
  it.skip("should return undefined if there is no query params", () => {
    const req = {
      url: "/api/todo/",
      method: "PUT",
    };
    expect(util.getIdParam(req)).to.be.undefined;
  });
});
