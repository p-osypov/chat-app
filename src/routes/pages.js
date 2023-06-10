import express from 'express';
import path from 'path';
import {PATHS} from "../constants.js";
import {authPageMiddleware} from "../middleware/authPageMiddleware.js";

const router = express.Router();
router.get(['/', '/login'], (req, res) => {
  res.sendFile(path.join(PATHS.public, 'login.html'));
});
router.get('/register', (req, res) => {
  res.sendFile(path.join(PATHS.public, 'register.html'));
});
router.get('/lobby', authPageMiddleware, (req, res) => {
  res.sendFile(path.join(PATHS.public, 'lobby.html'));
});
router.get('/chat-room/:chatRoomId', authPageMiddleware, (req, res) => {
  res.sendFile(path.join(PATHS.public, 'room.html'));
});

export default router;
