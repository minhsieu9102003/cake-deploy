import Card from "../models/card.model.js";
import Course from "../models/course.model.js";
import Folder from "../models/folder.model.js";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMyCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const courses = await Course.findOne({ userId });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const create = async (req, res) => {
  const { title, description, listCards } = req.body;
  try {
    const newCourse = await Course.create({
      title,
      description,
      userId: req.payload.id,
    });

    const cardIds = [];
    for (let card of listCards) {
      const { key, value } = card;
      const newCard = await Card.create({
        key,
        value,
        courseId: newCourse._id,
      });

      cardIds.push(newCard._id);
    };

    newCourse.cards = cardIds;
    await newCourse.save();

    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, listCards } = req.body;
  try {
    await Card.deleteMany({ courseId: id });

    const updatedCourse = await Course.findByIdAndUpdate(id, {
      title,
      description,
      userId: req.payload.id,
    });

    if (!updatedCourse) return res.status(404).json({ message: 'course not found!' });
    
    const cardIds = [];
    for (let card of listCards) {
      const { key, value } = card;
      const newCard = await Card.create({
        key,
        value,
        courseId: updatedCourse._id,
      });

      cardIds.push(newCard._id);
    };

    updatedCourse.cards = cardIds;
    await updatedCourse.save();

    return res.status(200).json({ message: "Update successfully!", updatedCourse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getLatestToOldest = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ updatedAt: -1 });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOldestToNewest = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ updatedAt: 1 });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default {
  getAll,
  getMyCourses,
  getOne,
  create,
  update,
  deleteCourse,
  getLatestToOldest,
  getOldestToNewest,
}