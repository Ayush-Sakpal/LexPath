import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const generateToken = (user) => {
  return jwt.sign(
    {id: user.id, role: user.role, email: user.email},
    JWT_SECRET,
    {expiresIn: "1h"}
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  }
  catch (error) {
    return null;
  }
};