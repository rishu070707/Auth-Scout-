import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/authscout';
  try {
    await mongoose.connect(uri);
    console.log(`[Database] Successfully connected to MongoDB at ${uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
    // Don't crash immediately in case of ephemeral connection delay, but log clearly
    throw error;
  }
}
