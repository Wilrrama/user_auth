import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
