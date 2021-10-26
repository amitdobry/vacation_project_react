global.config = require(process.env.NODE_ENV === "production"
  ? "./config-prod.json"
  : "./config-dev.json");
const fs = require("fs");
const fileUpload = require("express-fileupload"); // npm i express-fileupload
const express = require("express");
const authController = require("./controllers/auth-controller");
const vacationController = require("./controllers/vacation-controller");
const userController = require("./controllers/user-controller");
const server = express();
const cors = require("cors");
const socketLogic = require("./controllers/socket-controller");

server.use(express.json());
server.use(fileUpload());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use("/api/auth", authController);
server.use("/api/vacations", vacationController);
server.use("/api/user", userController);

if (!fs.existsSync("./controllers/images"))
  fs.mkdirSync("./controllers/images");

const listener = server.listen(3001, () => {
  console.log("Listening on http://localhost:3001");
});
socketLogic.start(listener);
