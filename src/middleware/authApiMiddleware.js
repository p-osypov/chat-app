import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../constants.js";

const authApiMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // No token provided, redirect to the login page
    return res.status(401)
        .json({ error: 'Not authorized.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Invalid token or expired, redirect to the login page
      return res.status(401)
          .json({ error: err.message });
    }

    // Valid token, store the decoded user data in the request object and proceed
    req.user = decoded;
    next();
  });
};

export default authApiMiddleware;
