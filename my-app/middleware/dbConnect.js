import mongoose from 'mongoose';

export const connectDB = handler => async (req, res) => {

    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return handler(req, res);
};

