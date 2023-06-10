import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants.js";
import generateRandomColor from "../utils/randomColor.js";

export const getUser = async ({username}) => {
  const user = await User.findOne({ username });
  if(!user) return null;
  return {
    username: user.username, password: user.password, userColor: user.userColor
  };
};
const createToken = (user) => jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
export const userLoginHandler = async ({ username, password }) => {
  try {
    const user = await getUser({username});

    if (!user) {
      return Promise.reject({
        message: 'The provided username or password are incorrect. Please try again.',
        status: 403
      });
    }

    // Sign the JWT token with the user data and set an expiration time
    const token = createToken({username, password});
    return Promise.resolve({ status: 200, username, password, token });
  } catch (err) {
    return Promise.reject({
      message: 'An error occurred while processing auth.',
      status: 500
    });
  }
};

export const userRegisterHandler = async ({ username, password }) => {
  try {
    // Check if username and password are provided
    if (!username || !password) {
      return Promise.reject({ status: 400, message: 'Username and password are required.' });
    }

    // Check if username is already taken
    const existingUser = await getUser({ username });

    if (existingUser) {
      return Promise.reject({status: 400, message: 'Username is already taken.' });
    }
    const token = createToken({username, password});
    // Create new user
    const user = new User({ username, password, userColor: generateRandomColor() });
    await user.save();

    return Promise.resolve({status: 201, message: 'User created successfully.', token });
  }catch (e) {
    return Promise.reject({status: 500, message: e.message });
  }
};
