import User from "../models/user.model.js";

const getAll = async (req, res) => {
  try {
    const Users = await User.find();
    return res.status(200).json(Users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const create = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    const User = await newUser.save();
    return res.status(201).json(User);
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body);

    if(!updateUser) return res.status(404).json({message: "User not found"});

    return res.status(200).json({message: "Update successfully!"});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const  deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    const User = await User.findByIdAndDelete(id);

    if(!User) return res.status(404).json({message: "User not found"});

    return res.status(200).json({message: "Delete successfully!"});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
}