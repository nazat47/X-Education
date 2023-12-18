const { BadRequest, Unauthenticated, NotFound } = require("../errors");
const { attachCookies, createTokenUser } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const user = require("../models/user");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // if(password.length<8){
  //   throw new BadRequest("Password must be more than 8 characters long")
  // }
  const isFirst = (await user.countDocuments({})) === 0;
  const role = isFirst ? "admin" : "client";
  const newUser = await user.create({ username, email, password, role });
  const tokenUser = createTokenUser(newUser);
  attachCookies(res, tokenUser);
  res.status(201).json(newUser);
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide your email and password");
  }
  const User = await user.findOne({ email });
  if (!User) {
    throw new NotFound("No user is associated with this email");
  }
  const passMatched = await User.comparePassword(password);
  if (!passMatched) {
    throw new Unauthenticated("Password is not correct");
  }
  const tokenUser = createTokenUser(User);
  attachCookies(res, tokenUser);
  const { password: pass, ...rest } = User._doc;
  res.status(StatusCodes.OK).json(rest);
};
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "user has been logged out" });
};
module.exports = { signup, signin, logout };
