import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: String,
  type: String,
  createdBy: String,
  createdDate: { type: Date, default: Date.now }
});

const ChatRoomSchema = new mongoose.Schema({
  roomName: String,
  roomId: String,
  createdBy: String,
  createdDate: { type: Date, default: Date.now },
  messages: [MessageSchema]
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

export default ChatRoom;
