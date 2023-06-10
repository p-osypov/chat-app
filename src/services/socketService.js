import ChatRoom from "../models/ChatRoom.js";
import {errorLogger} from "../utils/logger.js";

const socketService = (io, socket) => {
  socket.on('create message', async (data) => {
    try {
      const chatRoom = await ChatRoom.findOne({roomId: data.roomId});
      if (!chatRoom) {
        throw new Error('Chat room not found');
      }
      chatRoom.messages.push({content: data.content, type: data.type, createdBy: socket.user.username});

      await chatRoom.save();
      io.emit('message created', {createdBy: socket.user.username, userColor: socket.user.userColor, type: data.type, content: data.content});
    }catch (e) {
      errorLogger.error(`Error during creating message: ${e.message}`);
    }
  });
};
export default socketService;
