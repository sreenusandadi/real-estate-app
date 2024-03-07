import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import handleError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created succefully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(handleError(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(handleError(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};
