import mongoose from "mongoose";

const levelProgressSchema = new mongoose.Schema({
  name: String,
  completed: {
    type: Boolean,
    default: false,
  },
  currentQuestion:{
    type: Number,
    default: 0,
  },
  solvedQuestions: [],
});

const topicProgressSchema = new mongoose.Schema({
  name: String,
  levels: [levelProgressSchema],
});

const languageProgressSchema = new mongoose.Schema({
  name: String,
  topics: [topicProgressSchema],
});

const usersSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  points: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    default: "student",
  },
  progress: [languageProgressSchema], 
});

const User = mongoose.model("users", usersSchema);

export default User;
