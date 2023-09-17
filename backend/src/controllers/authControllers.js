import validator from "validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Please enter a strong password" });
  }

  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken({ id: newUser._id });

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "User created successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken({ id: user._id });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    })
    .json({
      message: "User logged out successfully",
    });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
