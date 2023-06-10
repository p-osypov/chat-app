import express from 'express';
import authApiMiddleware from "../middleware/authApiMiddleware.js";
import {userLoginHandler, userRegisterHandler} from "../services/authService.js";
import {createRoomService, getRoomService, getRoomsService} from "../services/roomService.js";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware.js";
import {loginLogger, registerLogger, errorLogger} from '../utils/logger.js';

const router = express.Router();
router.post('/api/login', async (req, res) => {
  try {
    const user = await userLoginHandler({username: req.body.username, password: req.body.password});
    res.cookie('token', user.token, { httpOnly: true });
    res.status(200).json({status: user.status});
    loginLogger.info(`User ${user.username} logged in.`);
  }catch (e) {
    res.status(e.status).json({error: e.message});
    errorLogger.error(`Error during login: ${e.message}`);
  }
});
router.post('/api/register', async (req, res) => {
  try {
    const response = await userRegisterHandler({username: req.body.username, password: req.body.password});
    res.cookie('token', response.token, { httpOnly: true });
    res.status(response.status).json(response);
    registerLogger.info(`User ${req.body.username} registered.`);
  } catch (e) {
    res.status(e.status).json(e);
    errorLogger.error(`Error during registration: ${e.message}`);
  }
});

router.post('/api/create-room', authApiMiddleware,async (req, res) => {
  try {
    const response = await createRoomService({
      roomName: req.body.roomName, createdBy: req.user.username
    });

    res.status(response.status).json(response);
  } catch (e) {
    res.status(e.status).json(e);
    errorLogger.error(`Error during create room: ${e.message}`);
  }
});
router.get('/api/rooms', authApiMiddleware,async (req, res) => {
  try {
    const response = await getRoomsService();

    res.status(response.status).json(response);
  } catch (e) {
    res.status(e.status).json(e);
    errorLogger.error(`Error during get rooms: ${e.message}`);
  }
});
router.get('/api/chat-room/:roomId', authApiMiddleware,async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const response = await getRoomService({roomId});
    res.status(response.status).json(response);
  } catch (e) {
    res.status(e.status).json(e);
    errorLogger.error(`Error during get room: ${e.message}`);
  }
});
router.post('/api/upload', fileUploadMiddleware, (req, res, next) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'File is not uploaded.' });
  }
  res.status(200).json({ filePath: `/storage/${file.filename}` });
});


export default router;
