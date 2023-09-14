import mongoose from 'mongoose';
import { rooms } from '../configs/table.config.js';
import ModelIncrement from '../utils/model.util.js';

const { Schema, model } = mongoose;
const roomsSchema = new Schema(rooms.columns);

roomsSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const idx = await ModelIncrement.getNextId('Room');
      this.id = idx;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Room = model('Room', roomsSchema);
export default Room;
