import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No user found" });
  } else {
    return res.status(200).json({ users });
  }
};

export const signUp = async (req, res) => {
  const { name, email, passward } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists Please login insted" });
  }
  // hashuing the passward
  const hashedPassward = bcrypt.hashSync(passward);
  const user = new User({
    name,
    email,
    passward: hashedPassward,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res) => {
  const { email, passward } = req.body;
  let existinfUser;
  try {
    existinfUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existinfUser) {
    return res.status(404).json({ message: "Count find this id my email" });
  }
  // user is available
  else {
    // comparing the existing passward with the enetred passward
    const isPasswardCorrect = bcrypt.compareSync(
      passward,
      existinfUser.passward
    );
    if (!isPasswardCorrect) {
      return res.status(400).json({ message: "Passward not correct" });
    } else {
      return res
        .status(200)
        .json({ message: "Login Succesfull", user: existinfUser });
    }
  }
};
