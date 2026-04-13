import model from "../courses/model.js";
import { v4 as uuidv4 } from "uuid";

export const findModulesForCourse = async (courseId) => {
  const course = await model.findById(courseId);
  return course ? course.modules : [];
};

export const createModule = async (courseId, module) => {
  const newModule = { ...module, _id: uuidv4() };
  await model.updateOne(
    { _id: courseId },
    { $push: { modules: newModule } }
  );
  return newModule;
};

export const updateModule = async (courseId, moduleId, moduleUpdates) => {
  const course = await model.findById(courseId);
  if (!course) return null;
  const module = course.modules.id(moduleId);
  if (!module) return null;
  Object.assign(module, moduleUpdates);
  await course.save();
  return module;
};

export const deleteModule = async (courseId, moduleId) => {
  return model.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } }
  );
};
