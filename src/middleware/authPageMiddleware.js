import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../constants.js';

export const authPageMiddleware = (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;
  // If token doesn't exist, redirect to login
  if (!token) {
    return res.redirect('/login');
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect('/login');

    // Valid token, store the decoded user data in the request object and proceed
    req.user = decoded;
    next();
  });
};
