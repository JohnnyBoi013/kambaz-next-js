import UserRoutes from "./users/routes.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import EnrollmentRoutes from "./enrollments/routes.js";

export default function Kambaz(app) {
  UserRoutes(app);
  CourseRoutes(app);
  ModuleRoutes(app);
  EnrollmentRoutes(app);
}
