const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { routes } = require("../src/routes");
const TodoController = require("../src/controller");

const expect = chai.expect;
chai.use(sinonChai);

describe("Check if router calls the expected controller method with right arguments", () => {
  let req,
    res = {};
  let todoController;
  let todosStub;

  beforeEach(() => {
    req = {
      url: "",
      method: "",
    };
    res = {
      writeHead: sinon.spy(),
      end: sinon.spy(),
    };
  });

  afterEach(() => {
    todosStub.restore();
  });

  it("Check if /api/todos GET calls getTodos(req, res)", () => {
    //Arrange
    req.url = "/api/todos";
    req.method = "GET";
    todosStub = sinon.stub(TodoController.prototype, "getTodos").returns(true);
    //Act
    routes(req, res);
    //Assert
    expect(todosStub).to.have.been.calledOnceWith(req, res);
    // expect(todosStub).to.have.been.calledOnceWithExactly(req, res);
    // sinon.assert.calledOnceWithExactly(todosStub, req, res);
  });

  it("Check if /api/todo/{id} GET calls getTodo(req, res)", () => {
    //Arrange
    req.url = "/api/todo/1";
    req.method = "GET";
    todosStub = sinon.stub(TodoController.prototype, "getTodo").returns(true);
    //Act
    routes(req, res);
    //Assert
    expect(todosStub).to.have.been.calledOnceWith(req, res);
  });

  it("Check if /api/todo POST calls createTodo(req, res)", () => {
    //Arrange
    req.url = "/api/todo";
    req.method = "POST";
    todosStub = sinon
      .stub(TodoController.prototype, "createTodo")
      .returns(true);
    //Act
    routes(req, res);
    //Assert
    expect(todosStub).to.have.been.calledOnceWith(req, res);
  });
});
