const config = require("./utils/config");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

if (config.MONGODB_URI_WITH_PWD) {
  mongoose.connect(config.MONGODB_URI_WITH_PWD);
  console.log("DB connected to: ", config.MONGODB_URI_WITH_PWD);
} else {
  console.log("NO MONGODB URL FOUND!!!");
}

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use(middleware.userExtractor);
app.use("/api/blogs", blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRoute = require("./controllers/testingRoute");
  app.use("/api/testing", testingRoute);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
