import Folder from "../models/folder.model.js";

const getAll = async (req, res) => {
  try {
    const Folders = await Folder.find();
    return res.status(200).json(Folders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const Folder = await Folder.findById(id);
    if (!Folder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json(Folder);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const create = async (req, res) => {
  try {
    const newFolder = await new Folder(req.body);
    const Folder = await newFolder.save();
    return res.status(201).json(Folder);
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  try {
    const updateFolder = await Folder.findByIdAndUpdate(id, req.body);

    if(!updateFolder) return res.status(404).json({message: "Folder not found"});

    return res.status(200).json({message: "Update successfully!"});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const  deleteFolder = async (req, res) => {
  const {id} = req.params;

  try {
    const Folder = await Folder.findByIdAndDelete(id);

    if(!Folder) return res.status(404).json({message: "Folder not found"});

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
  deleteFolder,
}