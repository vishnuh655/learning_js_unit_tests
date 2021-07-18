const http = require("http");
const PORT = 5000;
const routes = require("./routes");

const server = http.createServer((req, res) => routes(req, res));

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
