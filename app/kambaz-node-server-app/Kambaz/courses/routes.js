import * as dao from "./dao.js";
import { modules, enrollments, users } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export default function CourseRoutes(app) {
  const findAllCourses = (req, res) => {
    res.json(dao.findAllCourses());
  };

  const findCourseById = (req, res) => {
    const { cid } = req.params;
    const course = dao.findCourseById(cid);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(course);
  };

  const createCourse = (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.json(newCourse);
  };

  const updateCourse = (req, res) => {
    const { cid } = req.params;
    const updated = dao.updateCourse(cid, req.body);
    if (!updated) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(updated);
  };

  const deleteCourse = (req, res) => {
    const { cid } = req.params;
    const deleted = dao.deleteCourse(cid);
    if (!deleted) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(deleted);
  };

  const findModulesForCourse = (req, res) => {
    const { cid } = req.params;
    const courseModules = modules.filter((m) => m.course === cid);
    res.json(courseModules);
  };

  const createModuleForCourse = (req, res) => {
    const { cid } = req.params;
    const newModule = { ...req.body, _id: uuidv4(), course: cid };
    modules.push(newModule);
    res.json(newModule);
  };

  const findUsersForCourse = (req, res) => {
    const { cid } = req.params;
    const courseEnrollments = enrollments.filter((e) => e.course === cid);
    const courseUsers = courseEnrollments.map((e) =>
      users.find((u) => u._id === e.user),
    ).filter(Boolean);
    res.json(courseUsers);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:cid", findCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:cid", updateCourse);
  app.delete("/api/courses/:cid", deleteCourse);

  app.get("/api/courses/:cid/modules", findModulesForCourse);
  app.post("/api/courses/:cid/modules", createModuleForCourse);

  app.get("/api/courses/:cid/users", findUsersForCourse);
}
