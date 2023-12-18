const { NotFound } = require("../errors");
const Course = require("../models/course");
const { StatusCodes } = require("http-status-codes");

const createCourse = async (req, res) => {
  req.body.userRef = req.user.id;
  const course = await Course.create(req.body);
  res.status(201).json({ msg: "The course has been added successfully" });
};
const getCourses = async (req, res) => {
  const courses = await Course.find({});
  res.status(StatusCodes.OK).json({ courses, Total: courses.length });
};
const getCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ _id: id });
  if (!course) {
    throw new NotFound(`No course is found with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ course });
};
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const delCourse = await Course.findOneAndDelete({ _id: id });
  if (!delCourse) {
    throw new NotFound(`No course is found with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Course deleted" });
};
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const upCourse = await Course.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!upCourse) {
    throw new NotFound(`No course is found with id ${id}`);
  }
  res.status(StatusCodes.OK).json(upCourse);
};
module.exports = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};
