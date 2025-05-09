const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB (){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;