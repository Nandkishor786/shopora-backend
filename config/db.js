import mongoose from "mongoose";

// way1..................
export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    // console.log(url);
    if (!url) {
      throw new Error("MongoDb url is missing");
    }
    await mongoose.connect(url);
    console.log("mongoDB is Connected Successfully");
  } catch (error) {
    console.log("database Error", error.message);
  }
};

// way 2....

// export const connectDB = async () => {
//   const url = process.env.MONGO_URL;
//   // console.log(url);
//   if (!url) throw new Error("DB url is missing");
//   await mongoose
//     .connect(url)
//     .then(() => console.log("DB connected"))
//     .catch((err) => console.log(err));
// };
