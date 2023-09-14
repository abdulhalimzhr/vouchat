import Chat from '../models/chat.model.js';
import Room from '../models/room.model.js';

class ChatService {
  static async checkUsername(data) {
    try {
      const rows = await Room.findOne(data).exec();

      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async join(data) {
    try {
      const rows = await Room.create(data);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async exit(data) {
    try {
      const rows = await Room.deleteOne(data);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async sendMessage(data) {
    try {
      const rows = await Chat.create(data);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getMessagesByRoomId(roomId) {
    try {
      const rows = await Chat.find({ roomId: roomId }).exec();

      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatService;
