import ChatService from '../services/chat.service.js';
import crypto from 'crypto';

class ChatController {
  /**
   * Login user.
   * @path {POST} /api/login
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware.
   * @returns {Promise} - A promise that resolves with a JWT token.
   * @static
   * @async
   * @memberof AuthController
   * @function login
   * @example <caption>Example usage of login.</caption>
   * AuthController.login(req, res, next);
   * @example <caption>Example response of login.</caption>
   * {
   *    "status": 200,
   *    "message": "Login success"
   * }
   *
   */
  static async join(req, res, next) {
    const { username, roomId } = req.body;
    try {
      if (!username || !roomId) {
        return res.status(400).json({
          error: true,
          message: 'Username and room id are required!'
        });
      }

      const user = await ChatService.checkUsername({ username, roomId });

      if (user) {
        return res.status(400).json({
          error: true,
          message: 'Username is already exists in the selected room!'
        });
      }

      const data = await ChatService.join({
        username: username,
        roomId: roomId
      });

      return res.status(200).json({
        error: false,
        message: 'Login success',
        data: data,
        sessionId: crypto.randomBytes(16).toString('hex')
      });
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }

  static async exit(req, res, next) {
    const { username, roomId } = req.body;
    try {
      if (!username || !roomId) {
        return res.status(400).json({
          error: true,
          message: 'Username and room id are required!'
        });
      }

      const user = await ChatService.checkUsername({ username, roomId });

      if (!user) {
        return res.status(400).json({
          error: true,
          message: 'Username is not exists in the selected room!'
        });
      }

      const data = await ChatService.exit({
        username: username,
        roomId: roomId
      });

      return res.status(200).json({
        error: false,
        message: 'Exit success',
        data: data
      });
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }

  /**
   * Send message.
   * @path {POST} /api/send-message/room/:roomId
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware.
   * @returns {Promise} - A promise that resolves with a message.
   * @static
   * @async
   * @memberof ChatController
   * @function create
   * @example <caption>Example usage of create.</caption>
   * ChatController.create(req, res, next);
   * @example <caption>Example response of create.</caption>
   * {
   *   "status": 200,
   *   "message": "Send message success",
   *   "data": {
   *      "id": 1,
   *      "username": "user1",
   *      "message": "Hello",
   *      "roomId": 1,
   *      "createdAt": "2021-07-21T07:40:44.000Z"
   *    }
   * }
   *
   * @example <caption>Example response of create (error).</caption>
   * {
   *   "status": 500,
   *   "message": "Internal server error"
   * }
   */
  static async sendMessage(req, res, next) {
    const { username, message, roomId, sessionId } = req.body;

    try {
      if (!username || !message || !roomId || !sessionId) {
        return res.status(400).json({
          error: true,
          message: 'Username, message and room id are required!'
        });
      }

      const user = await ChatService.checkUsername({ username, roomId });

      if (!user) {
        return res.status(400).json({
          error: true,
          message: 'Username is not exists in the selected room!'
        });
      }

      const data = await ChatService.sendMessage({
        username: username,
        message: message,
        roomId: roomId,
        sessionId: sessionId
      });

      return res.status(200).json({
        error: false,
        message: 'Send message success',
        data: data
      });
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }

  /**
   * Get messages by room id.
   * @path {GET} /api/messages/room/:roomId
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware.
   * @returns {Promise} - A promise that resolves with a list of messages.
   * @static
   * @async
   * @memberof ChatController
   * @function getMessagesByRoomId
   * @example <caption>Example usage of getMessagesByRoomId.</caption>
   * ChatController.getMessagesByRoomId(req, res, next);
   * @example <caption>Example response of getMessagesByRoomId.</caption>
   * {
   *    "status": 200,
   *    "message": "Get messages success",
   *    "data": [
   *      {
   *        "id": 1,
   *        "username": "user1",
   *        "message": "Hello",
   *        "roomId": 1,
   *        "createdAt": "2021-07-21T07:40:44.000Z"
   *      },
   * }
   *
   * @example <caption>Example response of getMessagesByRoomId (empty).</caption>
   * {
   *    "status": 200,
   *    "message": "Get messages success",
   *    "data": []
   * }
   *
   * @example <caption>Example response of getMessagesByRoomId (error).</caption>
   * {
   *    "status": 500,
   *    "message": "Internal server error"
   * }
   */
  static async getMessagesByRoomId(req, res, next) {
    const { roomId } = req.params;

    try {
      if (!roomId) {
        return res.status(400).json({
          error: true,
          message: 'Room id is required!'
        });
      }

      const data = await ChatService.getMessagesByRoomId(roomId);

      return res.status(200).json({
        error: false,
        message: 'Get messages success',
        data: data
      });
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
}

export default ChatController;
