const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const data = require("../src/data");
const TodoController = require("../src/controller");
const util = require("../src/util");

const expect = chai.expect;
chai.use(sinonChai);

const dummyData = [
  {
    id: 1,
    title: "Coding in Javascript",
    description: "Working with functions in JavaScript",
    completed: false,
  },
  {
    id: 2,
    title: "Cooking Supper",
    description: "Preparing rice and chicken",
    completed: false,
  },
  {
    id: 3,
    title: "Taking a walk",
    description: "Easy time at the park",
    completed: false,
  },
  {
    id: 4,
    title: "Watching Netflix",
    description: "Enjoying the new premiered series",
    completed: false,
  },
];

const updateBody = {
  title: "Coding in Javascript Updated",
  description: "Working with functions in JavaScript",
  completed: true,
};

describe("Check if getTodos controllers returns response", () => {
  let req,
    res = {};
  let dataStub;

  beforeEach(() => {
    //Arrange
    req = {
      url: "/api/todos",
      method: "GET",
    };
    res = {
      writeHead: sinon.spy(),
      end: sinon.spy(),
    };
    dataStub = sinon.stub(data, "findAll").returns(dummyData);
  });

  afterEach(() => {
    dataStub.restore();
  });

  it("Check if getTodos(req, res) makes call to findAll()", async () => {
    //Act
    await new TodoController().getTodos(req, res);
    //Assert
    expect(dataStub).to.have.been.calledOnce;
  });

  it("Check if getTodos(req, res) returns same response as got from findAll()", async () => {
    //Arrange

    //Act
    await new TodoController().getTodos(req, res);
    //Assert
    // expect(data).to.have.been.calledImmediatelyBefore(res.end);
    expect(res.writeHead).to.have.been.calledWith(200);
    expect(res.end).to.have.been.calledWithExactly(JSON.stringify(dummyData));
  });
});

describe("Check if updateTodo controllers returns response", () => {
  let req,
    res = {};
  let dataStub;
  let utilStub, utilIdParamStub, utilReqDataStub;

  beforeEach(() => {
    //Arrange
    req = {
      url: "/api/todo/1/",
      method: "PUT",
    };
    res = {
      writeHead: sinon.spy(),
      end: sinon.spy(),
    };
    utilIdParamStub = sinon.stub(util, "getIdParam").returns(1);
    utilReqDataStub = sinon.stub(util, "getReqData").returns(updateBody);
  });

  afterEach(() => {
    dataStub.restore();
    utilIdParamStub.restore();
    utilReqDataStub.restore();
  });

  it("Check if updateTodo(req, res) makes call to update()", async () => {
    //Arrange
    dataStub = sinon.stub(data, "update").returns(dummyData[0]);
    //Act
    await new TodoController().updateTodo(req, res);
    //Assert
    expect(dataStub).to.have.been.calledOnce;
  });

  it("Check if updateTodo(req, res) returns same response as got from findAll()", async () => {
    //Arrange
    dataStub = sinon.stub(data, "update").returns(dummyData[0]);
    //Act
    await new TodoController().updateTodo(req, res);
    //Assert
    expect(res.writeHead).to.have.been.calledWith(200);
    expect(res.end).to.have.been.calledWithExactly(
      JSON.stringify(dummyData[0])
    );
  });

  it("retur 404 response if data with given id is not found to update", async () => {
    //Arrange
    dataStub = sinon.stub(data, "update").throws(() => {
      return new Error("Item with id not found");
    });
    //Act
    await new TodoController().updateTodo(req, res);
    //Assert
    expect(res.writeHead).to.have.been.calledWith(404);
    expect(res.end).to.have.been.calledWithExactly(
      JSON.stringify({ error: "Item with id not found" })
    );
  });
});
