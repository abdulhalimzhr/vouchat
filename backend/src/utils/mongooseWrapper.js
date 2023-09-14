import mongoose from 'mongoose';

export const connect = mongoose.connect;
export const connection = mongoose.connection;

export default mongoose;
