import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import { PATHS } from "./constants.js";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from "path";
import authSocketMiddleware from "./middleware/authSocketMiddleware.js";
import socketService from "./services/socketService.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.static(PATHS.public));
app.use('/storage', express.static(PATHS.storage));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes.pages);
app.use(routes.api);
app.use((req, res) => {
  res.status(404).sendFile(path.join(PATHS.public, '404.html'));
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.info(`MongoDB connected as "${process.env.MONGO_URI}"`))
    .catch(err => console.log(err));

const PORT = process.env.PORT;

const server = createServer(app);
const io = new SocketServer(server);

authSocketMiddleware(io, socketService);

server.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
  console.info('ENV =>', PATHS);
});
