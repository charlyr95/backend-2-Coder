import path from 'path';
import express from 'express';
import connectDB from './config/db.js';

// imports local modules
import errorHandler from './middlewares/errorHandler.js';
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
// app.use("/api/carts", cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use(errorHandler);
connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});