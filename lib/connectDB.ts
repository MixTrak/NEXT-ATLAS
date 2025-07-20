import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Please define MONGO_URI in .env.local');
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      // Explicitly specify the database name from your connection string
      await mongoose.connect(MONGO_URI, {
        dbName: 'Data' // This forces mongoose to use the 'Data' database
      });
      console.log('Connected to MongoDB - Database: Data');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};