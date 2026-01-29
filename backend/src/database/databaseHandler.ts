import mongoose from "mongoose";

export async function ConnectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string, {
      dbName: "local-food-rescue",
    });
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.log("❌ Database connection failed.");
  }
}

// export default ConnectDatabase;
