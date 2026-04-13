import * as dao from "./dao.js";
import * as modulesDao from "../modules/dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const { cid } = req.params;
    const course = await dao.findCourseById(cid);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(course);
  };

  const createCourse = async (req, res) => {
    const newCourse = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    }
    res.json(newCourse);
  };

  const updateCourse = async (req, res) => {
    const { cid } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(cid, courseUpdates);
    res.send(status);
  };

  const deleteCourse = async (req, res) => {
    const { cid } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(cid);
    const status = await dao.deleteCourse(cid);
    res.send(status);
  };

  const findModulesForCourse = async (req, res) => {
    const { cid } = req.params;
    const modules = await modulesDao.findModulesForCourse(cid);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { cid } = req.params;
    const newModule = await modulesDao.createModule(cid, req.body);
    res.json(newModule);
  };

  const updateModule = async (req, res) => {
    const { cid, mid } = req.params;
    const status = await modulesDao.updateModule(cid, mid, req.body);
    res.send(status);
  };

  const deleteModule = async (req, res) => {
    const { cid, mid } = req.params;
    const status = await modulesDao.deleteModule(cid, mid);
    res.send(status);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:cid", findCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:cid", updateCourse);
  app.delete("/api/courses/:cid", deleteCourse);

  app.get("/api/courses/:cid/modules", findModulesForCourse);
  app.post("/api/courses/:cid/modules", createModuleForCourse);
  app.put("/api/courses/:cid/modules/:mid", updateModule);
  app.delete("/api/courses/:cid/modules/:mid", deleteModule);

  app.get("/api/courses/:cid/users", findUsersForCourse);

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
