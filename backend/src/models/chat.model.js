import mongoose from 'mongoose';
import { chats } from '../configs/table.config.js';
import ModelIncrement from '../utils/model.util.js';

const { Schema, model } = mongoose;
const chatSchema = new Schema(chats.columns);

chatSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const idx = await ModelIncrement.getNextId('Chat');
      this.id = idx;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Chat = model('Chat', chatSchema);
export default Chat;
