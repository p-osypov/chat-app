import ChatRoom from "../models/ChatRoom.js";
import uuid from "uuid4";
import User from "../models/User.js";
export const createRoomService = async ({ roomName, createdBy }) => {
  try {
    const newRoom = new ChatRoom({ roomName, createdBy, messages: [], roomId: uuid() });

    await newRoom.save();
    return Promise.resolve({
      status: 201,
      newRoom
    });
  } catch (err) {
    return Promise.reject({
      message: 'An error occurred while processing auth.',
      status: 500
    });
  }
};
export const getRoomsService = async () => {
  try {
    const rooms = await ChatRoom.find({}, 'roomId roomName');
    if (!rooms || rooms.length === 0) {
      return Promise.reject({ status: 404, message: 'No rooms found for this user.' });
    }

    return Promise.resolve({
      rooms: rooms.reverse(),
      status: 200
    });
  } catch (err) {
    return Promise.reject({
      message: 'An error occurred while processing auth.',
      status: 500
    });
  }
};
export const getRoomService = async ({roomId}) => {
  try {

    const room = await ChatRoom.findOne({roomId}, 'roomName messages');
    const users = await User.find({});
    const usersColorMap = users.reduce((acc, user) => {
      return {
        ...acc,
        [user.username]: user.userColor
      }
    }, {});
    if (!room) {
      return Promise.reject({ status: 404, message: 'Not found.' });
    }
    const messages = room.toObject({versionKey: false}).messages;
    return Promise.resolve({
      messages: messages.map(message => ({...message, userColor: usersColorMap[message.createdBy]})),
      roomName: room.roomName,
      status: 200
    });
  } catch (err) {
    return Promise.reject({
      message: 'An error occurred while processing auth.',
      status: 500
    });
  }
};

