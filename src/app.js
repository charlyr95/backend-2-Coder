// npm
import path from "path";
import express from "express";

// imports local modules
import config from "./config/config.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/_index.js";

// server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes);

// error handler middleware
app.use(errorHandler);

// mongoDB
connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
