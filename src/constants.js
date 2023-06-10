import path from "path";
import dotenv from 'dotenv';

dotenv.config();

export const PATHS = {
  public: path.join(process.cwd(), 'public'),
  root: process.cwd(),
  storage: path.join(process.cwd(), 'storage'),
  logs: (filename) => path.join(process.cwd(), 'logs', `${filename}.log`)
}
export const JWT_SECRET = process.env.API_SECRET;
