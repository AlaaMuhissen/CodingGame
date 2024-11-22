import jwt from "jsonwebtoken";
import User from "../models/users.schema.js";


export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // Ensure the header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token
      const token = authHeader.split(" ")[1];

      console.log("Extracted token:", token); // Debug log

      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log("Decoded payload:", decoded); // Debug log

      // Find the user in the database
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      req.user = user; // Attach the user to the request object
      next();
    } else {
      return res.status(401).send("Unauthorized: No or invalid token");
    }
  } catch (error) {
    console.error("Error in isAuth middleware:", error.message);
    res.status(401).send("Unauthorized: Invalid token");
  }
};


export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "Teacher") {
      return res.status(403).send("Access Forbidden: Admins only");
    }

    next();
  } catch (error) {
    next(error);
  }
};
