import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/user.js';

export const signUp = async(req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Bad request Error
      return res.status(400).json({message: "User already exists. "});
    }
    if (password !== confirmPassword) {
      return res.status(400).json({message: "Passwords do not match. "});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, 'password': hashedPassword, name: `${firstName} ${lastName}`});

    // Todo: add real secret string
    const token = jwt.sign({ email: newUser.email, id: newUser._id}, 'test', { expiresIn: '1h'});
    // Success
    res.status(200).json({result: newUser, token});
  }
  catch (error) {
    // Server Error
    console.log(error);
    res.status(500).json({message: "Something went wrong."});
  }
}

export const logIn = async(req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Not found Error
      return res.status(404).json({message: "User doesnt exist. "});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // Bad Request error
      return res.status(400).json({message: "Invalid credentials"});
    }
    // Todo: add real secret string
    const token = jwt.sign({ email: user.email, id: user._id}, 'test', { expiresIn: '1h'});
    // Success
    res.status(200).json({result: user, token});
  }
  catch (error) {
    // Server Error
    res.status(500).json({message: "Something went wrong."});
  }
}