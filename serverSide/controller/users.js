import User from "../models/users.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";


export const createUser = async (req, res, next) => {
  try {
    //* Get the data from body
    const { username, email, password, role } = req.body;

    //* Validate input fields
    if (!(email && password && role && username)) {
      res.status(402);
      throw new Error("Email, password, role, and username are required");
    }

    //* Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(402);
      throw new Error("User already exists in the database");
    }

    //* Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //* Create the user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    //* Generate a JWT token for the new user
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.SECRET,
      {
        expiresIn: "1h", // Token expiry time
      }
    );

    //* Return the new user along with the token
    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    //* get the email and password from body
    const { email, password } = req.body;
    //* check if email and password are filled
    if (!(email && password)) {
      res.status(400);
      throw new Error("Email and Password must be filled");
    }
    //* find the user
    const existingUser = await User.findOne({ email });
    //* check if user exist
    if (!existingUser) {
      res.status(404);
      throw new Error("no user exist with this email");
    }
    //* compare the password
    const comparePass = await bcrypt.compare(password, existingUser.password);
    //*if user exist (true) do the compare else dont run this code
    if (existingUser && comparePass) {
      //* Create access token to the user
      // jwt.sign(Payload , secret,expireIn)
      const token = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
          points: existingUser.points,
        },
        process.env.SECRET,
        {
          expiresIn: "15m",
        }
      );

      //* log the user
      res.send({token , progress : existingUser.progress , points : existingUser.points} );
    } else {
      res.status(400).send("email or password incorrect");
    }
  } catch (error) {
    next(error);
  }
};
export const userProfile = async (req, res, next) => {
  try {
    const { user } = req;
    console.log(`==== ${user}=======`);

    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }

    // Construct the user profile response
    const userProfile = {
      username: user.username,
      email: user.email,
      role: user.role,
      points: user.points,
      progress: user.progress,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};


export const userPoints = async (req, res, next) => {
  try {

    const { user } = req;
console.log(user)
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }

    const userPoints = user.points;

    res.status(200).json({ points: userPoints });
  } catch (error) {
    next(error);
  }
};

export const updateUserPoints = async (req, res, next) => {
  try {
    const { user } = req;
    const { points } = req.body;

    if (points === undefined) {
      res.status(400).json({ error: "New points are required for the update." });
      return;
    }

    user.points = points;

    await user.save();

    res.status(200).json({ message: "User points updated successfully.", points: user.points });
  } catch (error) {
    next(error);
  }
};

export const updateUserProgress = async (req, res, next) => {
  try {
    const { user } = req;
    const { progress } = req.body;

    if (progress === undefined) {
      res.status(400).json({ error: "New progress are required for the update." });
      return;
    }

    user.progress = progress;

    await user.save();

    res.status(200).json({ message: "User progress updated successfully.", progress: user.progress });
  } catch (error) {
    next(error);
  }
};
