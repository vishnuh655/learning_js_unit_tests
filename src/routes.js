const TodoController = require("./controller");

module.exports = {
  routes: (req, res) => {
    try {
      if (req.url === "/api/todos" && req.method === "GET") {
        new TodoController().getTodos(req, res);
      } else if (
        req.url.match(/\/api\/todo\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        new TodoController().getTodo(req, res);
      } else if (req.url === "/api/todo" && req.method === "POST") {
        new TodoController().createTodo(req, res);
      } else if (
        req.url.match(/\/api\/todo\/([0-9]+)/) &&
        req.method === "PUT"
      ) {
        new TodoController().updateTodo(req, res);
      } else if (
        req.url.match(/\/api\/todo\/([0-9]+)/) &&
        req.method === "DELETE"
      ) {
        new TodoController().deleteTodo(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Internal Server Error",
          error: JSON.stringify(error),
        })
      );
    }
  },
};
