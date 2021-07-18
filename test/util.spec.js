const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
var Stream = require("stream");
var stream = new Stream();

const util = require("../src/util");

const expect = chai.expect;
chai.use(sinonChai);

describe("Check if getTodos controllers returns response", () => {
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

  it("Parses body of the rquest object", async () => {
    //Act
    await util.getReqData(req);
  });
});
