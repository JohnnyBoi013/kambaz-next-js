import { enrollments } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllEnrollments = () => enrollments;

export const findEnrollmentsForUser = (userId) =>
  enrollments.filter((e) => e.user === userId);

export const findEnrollmentsForCourse = (courseId) =>
  enrollments.filter((e) => e.course === courseId);

export const enrollUserInCourse = (userId, courseId) => {
  const existing = enrollments.find(
    (e) => e.user === userId && e.course === courseId,
  );
  if (existing) return existing;
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId,
  );
  if (index === -1) return null;
  const deleted = enrollments[index];
  enrollments.splice(index, 1);
  return deleted;
};
