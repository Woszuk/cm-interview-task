import mongoose from "mongoose";

export const connectToDatabase = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
