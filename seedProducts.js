// seedProducts.js

import mongoose from "mongoose";

import dotenv from "dotenv";

import Product from "./models/Product.js";

import products from "./data/productsData.js";

dotenv.config();

// CONNECT DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    try {
      console.log("MongoDB Connected");

      // DELETE OLD PRODUCTS
      await Product.deleteMany();

      console.log("Old Products Deleted");

      // INSERT NEW PRODUCTS
      await Product.insertMany(products);

      console.log("Products Seeded Successfully");

      process.exit();
    } catch (error) {
      console.log(error);

      process.exit(1);
    }
  })
  .catch((error) => {
    console.log(error);

    process.exit(1);
  });
