import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const fetchAllCourses = async () => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/courses`);
  return response.data;
};

export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/current/courses`,
  );
  return response.data;
};

export const createCourse = async (course: object) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/courses`,
    course,
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/courses/${courseId}`,
  );
  return response.data;
};

export const updateCourse = async (courseId: string, course: object) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/courses/${courseId}`,
    course,
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/courses/${courseId}/modules`,
  );
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: object,
) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/courses/${courseId}/modules`,
    module,
  );
  return response.data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/modules/${moduleId}`,
  );
  return response.data;
};

export const updateModule = async (moduleId: string, module: object) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/modules/${moduleId}`,
    module,
  );
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/enrollments`,
    { userId, courseId },
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/enrollments/${userId}/${courseId}`,
  );
  return response.data;
};
