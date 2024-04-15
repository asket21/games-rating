const http = require("http");
const staticFile = require("./AppModules/http-utils/static-file");
const path = require("path");
const mimeTypes = require("./AppModules/http-utils/mime-types");
const mainRouteController = require("./controllers/main")
const defaultRouteController = require("./controllers/default")

const server = http.createServer((req, res) => {
  let data = "";
  const url = req.url;
  switch (url) {
    case "/":
      mainRouteController(res, "/index.html", ".html");
      break;
    case "/game":
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end("Спасибо за запрос, скоро придумаю, что тебе ответить", "utf8");

      break;

    case "/vote":
      if (req.method !== "POST") {
        res.writeHead(405, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end("Запрещённый метод запроса", "utf8");
      } else {
        req.on("data", (chunk) => {
          data += chunk.toString();
        });

        req.on("end", () => {
          console.log(JSON.parse(data));
        });
        break;
      }
    default:
      defaultRouteController(res,url);
  }
});

server.listen(3005);
