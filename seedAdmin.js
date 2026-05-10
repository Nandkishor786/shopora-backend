import { connectDB } from "./config/db.js";

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User from "./models/User.js";

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    // CHECK EXISTING ADMIN
    const existingAdmin =
      await User.findOne({
        email:
          "nandkishorpal0404@gmail.com",
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists"
      );

      process.exit();
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        "Mom@2026",
        10
      );

    // CREATE ADMIN
    await User.create({
      name: "Nandkishor",

      email:
        "nandkishorpal0404@gmail.com",

      password: hashedPassword,

      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedAdmin();