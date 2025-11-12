import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  }
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
