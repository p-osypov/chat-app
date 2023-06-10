import cookie from "cookie";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants.js";
import {getUser} from "../services/authService.js";
import {socketLogger, errorLogger} from "../utils/logger.js";

const authSocketMiddleware = (io, socketRequests) => {
  io.on('connection', (socket) => {
    if (socket.request.headers.cookie) {
      const cookies = cookie.parse(socket.request.headers.cookie);
      const token = cookies.token;
      if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
          if (err) {
            errorLogger.error(`Token verification error: ${err.message}`);
            socket.disconnect();
          } else {
            socket.user = await getUser({username: decoded.username});
            socketLogger.info(`${socket.user.username} is connected`);
            socketRequests(io, socket);
          }
        });
      } else {
        errorLogger.error(`Socket error connection: No token provided.`);
        socket.disconnect();
      }
    } else {
      errorLogger.error(`Socket error connection: No cookies provided.`);
      socket.disconnect();
    }

    socket.on('disconnect', () => {
      socketLogger.info(`${socket.user.username} is disconnected`);
    });
  });
};
export default authSocketMiddleware;
