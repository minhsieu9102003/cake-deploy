import Course from "../models/course.model.js";

const getAll = async (req, res) => {
  try {
    const Courses = await Course.find();
    return res.status(200).json(Courses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

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
    const Course = await newCourse.save();
    return res.status(201).json(Course);
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  try {
    const updateCourse = await Course.findByIdAndUpdate(id, req.body);

    if(!updateCourse) return res.status(404).json({message: "Course not found"});

    return res.status(200).json({message: "Update successfully!"});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const  deleteCourse = async (req, res) => {
  const {id} = req.params;

  try {
    const Course = await Course.findByIdAndDelete(id);

    if(!Course) return res.status(404).json({message: "Course not found"});

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
  deleteCourse,
}