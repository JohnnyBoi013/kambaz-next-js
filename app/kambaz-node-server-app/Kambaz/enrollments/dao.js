import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllEnrollments = () => model.find();

export const findCoursesForUser = async (userId) => {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
};

export const findUsersForCourse = async (courseId) => {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
};

export const enrollUserInCourse = (userId, courseId) =>
  model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });

export const unenrollUserFromCourse = (userId, courseId) =>
  model.deleteOne({ user: userId, course: courseId });

export const unenrollAllUsersFromCourse = (courseId) =>
  model.deleteMany({ course: courseId });
