const data = require("./data");
const util = require("./util");

class Controller {
  /**
   * get all todos
   * @param {*} req
   * @param {*} res
   */
  async getTodos(req, res) {
    const todos = await data.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  }

  /**
   * get single todo
   * @param {*} req
   * @param {*} res
   */
  async getTodo(req, res) {
    const id = util.getIdParam(req);
    const todo = await data.findById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  }

  /**
   * creating a todo
   * @param {*} req
   * @param {*} res
   */
  async createTodo(req, res) {
    const todo = await util.getReqData(req);
    const newTodo = await data.create(JSON.parse(todo));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTodo));
  }

  /**
   * updating a todo
   * @param {*} req
   * @param {*} res
   */
  async updateTodo(req, res) {
    try {
      const id = util.getIdParam(req);
      const todo = await util.getReqData(req);
      const updatedTodo = await data.update(todo, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedTodo));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: error.message,
        })
      );
    }
  }

  /**
   * delete todo
   * @param {*} req
   * @param {*} res
   */
  async deleteTodo(req, res) {
    try {
      const id = util.getIdParam(req);
      const todo = await data.delete(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: error.message,
        })
      );
    }
  }
}

module.exports = Controller;
