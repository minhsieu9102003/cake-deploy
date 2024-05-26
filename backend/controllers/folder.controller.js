import Folder from "../models/folder.model.js";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    const folders = await Folder.find();
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const folder = await Folder.findById(id).populate("courses");
    if (!folder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json(folder);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMyFolders = async (req, res) => {
  try {
    const { userId } = req.params;
    const myFolders = await Folder.find({ userId });

    return res.status(200).json(myFolders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// get all courses in one folder
const getCoursesInFolder = async (req, res) => {
  const { folderId } = req.params;
  //console.log(folderId);
  try {
    const _folderId = new mongoose.Types.ObjectId(folderId);
    const folder = await Folder.findById(_folderId).populate("courses");
    return res.status(200).json(folder.courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}

const create = async (req, res) => {
  try {
    const newFolder = await new Folder(req.body);
    const folder = await newFolder.save();
    return res.status(201).json(folder);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updateFolder = await Folder.findByIdAndUpdate(id, req.body);

    if (!updateFolder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json({ message: "Update successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  const { id } = req.params;

  try {
    const folder = await Folder.findByIdAndDelete(id);

    if (!folder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const addCourse = async (req, res, next) => {
  const { folderId, courseId } = req.params;
  try {
    const folder = await Folder.findByIdAndUpdate(folderId, { $push: { courses: courseId } }, { new: true });

    return res.status(200).json(folder);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const deleteCourse = async (req, res, next) => {
  const { folderId, courseId } = req.params;
  try {
    const folder = await Folder.findByIdAndUpdate(folderId, { $pull: { courses: courseId } });

    return res.status(200).json({ message: "Delete course successfully!", folder });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const getList = async (req, res) => {
  const { userId } = req.params;
  const { limit } = req.query;

  try {
    const folders = await Folder.find({ userId }).limit(parseInt(limit, 10) || 10);
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getLatestToOldest = async (req, res, next) => {
  try {
    const folders = await Folder.find().sort({ updatedAt: -1 });
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOldestToNewest = async (req, res, next) => {
  try {
    const folders = await Folder.find().sort({ updatedAt: 1 });
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default {
  getAll,
  getMyFolders,
  getOne,
  create,
  update,
  deleteFolder,
  addCourse,
  deleteCourse,
  getCoursesInFolder,
  getLatestToOldest,
  getOldestToNewest,
  getList,
}