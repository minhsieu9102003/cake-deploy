import Course from "../models/course.model.js";
import Folder from "../models/folder.model.js";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    const Courses = await Course.find();
    return res.status(200).json(Courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMyCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const courses = await Folder.aggregate([
      // { $match: { userId: mongoose.Types.ObjectId(userId) } }, // Match folders by userId
      { $match: { userId } }, // Match folders by userId
      {
        $lookup: {
          from: 'courses', // Collection to join (should match the collection name in MongoDB)
          localField: '_id', // Field from the Folder collection
          foreignField: 'folderId', // Field from the Course collection
          as: 'courses' // Output array field
        }
      },
      { $unwind: '$courses' }, // Deconstruct the courses array
      { $replaceRoot: { newRoot: '$courses' } } // Replace the root to return only courses
    ]);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

// get all courses in one folder
const getCoursesInFolder = async (req, res) => {
  const { folderId } = req.params;
  try {
    const courses = await Course.find({ folderId });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const Course = await Course.findById(id);
    if (!Course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(Course);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const create = async (req, res) => {
  try {
    const newCourse = await new Course(req.body);
    const course = await newCourse.save();
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updateCourse = await Course.findByIdAndUpdate(id, req.body);

    if (!updateCourse) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({ message: "Update successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const Course = await Course.findByIdAndDelete(id);

    if (!Course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default {
  getAll,
  getMyCourses,
  getCoursesInFolder,
  getOne,
  create,
  update,
  deleteCourse,
}