import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../helpers/generateToken.js";

// register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.find({ username });

    if (!user) return res.status(404).json({ message: "username not found" });

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) return res.status(404).json({ message: "wrong password" });

    const accessToken = generateToken.generateAccessToken;
    const refreshToken = generateToken.generateRefreshToken;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// log out
const logout = async (req, res) => {
  res.status(200).json({message: "Logged out!"});
};

export default {
  register,
  login,
  logout,
}
