import mongoose from "mongoose";

export async function connect(): Promise<void> {
  try {
    mongoose.set("debug", true);
    mongoose.connection.on("connecting", () => {
      console.log(`MongoDB: connecting.`);
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB: connected.");
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("MongoDB: disconnecting.");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB: disconnected.");
    });

    if (
      mongoose.connection.readyState !== 1 &&
      mongoose.connection.readyState !== 2
    ) {
      await mongoose.connect("mongodb://renan:123456@localhost:27017/renandb", {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
    }
  } catch (error) {
    console.log(`Error connecting to DB`, error);
  }
}
