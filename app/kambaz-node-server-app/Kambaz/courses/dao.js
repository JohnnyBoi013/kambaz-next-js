import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourses = () =>
  model.find({}, { name: 1, description: 1, number: 1, credits: 1 });

export const findCourseById = (courseId) => model.findById(courseId);

export const createCourse = (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
};

export const updateCourse = (courseId, courseUpdates) =>
  model.updateOne({ _id: courseId }, { $set: courseUpdates });

export const deleteCourse = (courseId) =>
  model.deleteOne({ _id: courseId });
