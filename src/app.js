// npm
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

// imports local modules
import config from "./config/config.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import routes from "./routes/_index.js";

// server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api", routes);

// error handler middleware
app.use(errorHandler);

// mongoDB
connectDB();

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});
