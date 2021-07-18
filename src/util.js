//utils.js
module.exports = {
  getReqData: (req) => {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
        // listen to data sent by client
        req.on("data", (chunk) => {
          // append the string version to the body
          body += chunk.toString();
        });
        // listen till the end
        req.on("end", () => {
          // send back the data
          resolve(JSON.parse(body));
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdParam: (req) => {
    return req.url.split("/")[3];
  },
};
