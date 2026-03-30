import { modules } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllModules = () => modules;

export const findModuleById = (moduleId) =>
  modules.find((module) => module._id === moduleId);

export const findModulesForCourse = (courseId) =>
  modules.filter((module) => module.course === courseId);

export const createModule = (module) => {
  const newModule = { ...module, _id: uuidv4() };
  modules.push(newModule);
  return newModule;
};

export const updateModule = (moduleId, module) => {
  const index = modules.findIndex((m) => m._id === moduleId);
  if (index === -1) return null;
  modules[index] = { ...modules[index], ...module };
  return modules[index];
};

export const deleteModule = (moduleId) => {
  const index = modules.findIndex((m) => m._id === moduleId);
  if (index === -1) return null;
  const deleted = modules[index];
  modules.splice(index, 1);
  return deleted;
};
