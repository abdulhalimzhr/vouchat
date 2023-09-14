// Define table config for mongodb migration
// Path: backend/src/configs/table.config.js
import validator from 'validator';

export const chats = {
  columns: {
    id: {
      type: Number,
      unique: true
    },
    roomId: String,
    username: {
      type: String,
      validate: [
        validator.isAlphanumeric,
        'Usernames may only have letters and numbers.'
      ]
    },
    message: String,
    sessionId: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
};

export const rooms = {
  columns: {
    id: {
      type: Number,
      unique: true
    },
    roomId: String,
    username: {
      type: String,
      required: true,
      validate: [
        validator.isAlphanumeric,
        'Usernames may only have letters and numbers.'
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
};

export const tableConfig = {
  chats: chats
};
