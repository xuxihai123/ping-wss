const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const port = 3000;
const indexfile = path.resolve(__dirname, "index.html");

var expressWs = require("express-ws")(app);

app.ws("/echo", function(ws, req) {
  console.log("socket connection...");
  ws.on("message", function(msg) {
    console.log("message..." + msg);
    ws.send(`服务端接受到的信息：[${msg}]`);
  });
});

app.get("/", function(req, res) {
  fs.createReadStream(indexfile).pipe(res);
});
app.listen(port);

console.log("http/websocket server listen on http://127.0.0.1:" + port);
