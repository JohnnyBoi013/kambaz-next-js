import { courses } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourses = () => courses;

export const findCourseById = (courseId) =>
  courses.find((course) => course._id === courseId);

export const createCourse = (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = (courseId, course) => {
  const index = courses.findIndex((c) => c._id === courseId);
  if (index === -1) return null;
  courses[index] = { ...courses[index], ...course };
  return courses[index];
};

export const deleteCourse = (courseId) => {
  const index = courses.findIndex((c) => c._id === courseId);
  if (index === -1) return null;
  const deleted = courses[index];
  courses.splice(index, 1);
  return deleted;
};
