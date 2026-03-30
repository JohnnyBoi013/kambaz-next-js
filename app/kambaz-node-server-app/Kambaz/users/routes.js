import * as dao from "./dao.js";
import { enrollments, courses } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export default function UserRoutes(app) {
  // Auth routes (must come before /:uid routes)
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session.currentUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const signup = (req, res) => {
    const { username } = req.body;
    const existingUser = dao.findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const profile = (req, res) => {
    const { currentUser } = req.session;
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }
    res.json(currentUser);
  };

  const updateProfile = (req, res) => {
    const { currentUser } = req.session;
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }
    const updated = dao.updateUser(currentUser._id, req.body);
    req.session.currentUser = updated;
    res.json(updated);
  };

  // User CRUD routes
  const findAllUsers = (req, res) => {
    const { role, name } = req.query;
    if (role) {
      res.json(dao.findUsersByRole(role));
      return;
    }
    if (name) {
      const users = dao.findAllUsers().filter(
        (u) =>
          u.firstName.toLowerCase().includes(name.toLowerCase()) ||
          u.lastName.toLowerCase().includes(name.toLowerCase()),
      );
      res.json(users);
      return;
    }
    res.json(dao.findAllUsers());
  };

  const findUserById = (req, res) => {
    const { uid } = req.params;
    const user = dao.findUserById(uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  };

  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };

  const updateUser = (req, res) => {
    const { uid } = req.params;
    const updated = dao.updateUser(uid, req.body);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (req.session.currentUser && req.session.currentUser._id === uid) {
      req.session.currentUser = updated;
    }
    res.json(updated);
  };

  const deleteUser = (req, res) => {
    const { uid } = req.params;
    const deleted = dao.deleteUser(uid);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(deleted);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      const { currentUser } = req.session;
      if (!currentUser) {
        res.status(401).json({ message: "Not signed in" });
        return;
      }
      uid = currentUser._id;
    }
    const userEnrollments = enrollments.filter((e) => e.user === uid);
    const userCourses = userEnrollments
      .map((e) => courses.find((c) => c._id === e.course))
      .filter(Boolean);
    res.json(userCourses);
  };

  const createCourseForUser = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      const { currentUser } = req.session;
      if (!currentUser) {
        res.status(401).json({ message: "Not signed in" });
        return;
      }
      uid = currentUser._id;
    }
    const course = req.body;
    const newCourse = { ...course, _id: uuidv4() };
    courses.push(newCourse);
    const newEnrollment = { _id: uuidv4(), user: uid, course: newCourse._id };
    enrollments.push(newEnrollment);
    res.json(newCourse);
  };

  // Register auth routes BEFORE /:uid to avoid conflicts
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/signup", signup);
  app.get("/api/users/profile", profile);
  app.put("/api/users/profile", updateProfile);

  // CRUD routes
  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.get("/api/users/:uid", findUserById);
  app.put("/api/users/:uid", updateUser);
  app.delete("/api/users/:uid", deleteUser);

  // Enrollment-related user routes
  app.get("/api/users/:uid/courses", findCoursesForEnrolledUser);
  app.post("/api/users/:uid/courses", createCourseForUser);
}
