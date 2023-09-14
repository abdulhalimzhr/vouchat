import express, { Router } from 'express';
import ChatController from '../controllers/chat.controller.js';

const router = Router();
router.use(express.json());

router.post('/join', ChatController.join);
router.post('/exit', ChatController.exit);

router.get('/messages/room/:roomId', ChatController.getMessagesByRoomId);
router.post('/send-message', ChatController.sendMessage);

export default router;
