require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header
  res.setHeader("Content-Type", "text/html");
  // response write

  /* res.write("<p>hello from the server</p>");
  res.write("<h1>hello from the server</h1>"); */
  // response end
  // res.end();

  let path = "./html/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;

    default:
      path += "notFound.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`localhost running ${PORT}...`);
});
