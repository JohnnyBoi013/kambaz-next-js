import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const findAllEnrollments = (req, res) => {
    res.json(dao.findAllEnrollments());
  };

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const deleted = dao.unenrollUserFromCourse(userId, courseId);
    if (!deleted) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }
    res.json(deleted);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
}
