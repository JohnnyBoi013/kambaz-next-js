"use client";
import { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const [showNav, setShowNav] = useState(true);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses,
  ) as { _id: string; name: string }[];
  const enrollmentsState = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const enrollments = (
    enrollmentsState as unknown as {
      enrollments: { user: string; course: string }[];
    }
  ).enrollments;

  const isFaculty = currentUser?.role === "FACULTY";
  const isEnrolled = enrollments.some(
    (e) => e.user === currentUser?._id && e.course === cid,
  );

  if (!isFaculty && !isEnrolled) {
    router.push("/dashboard");
    return null;
  }

  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <CourseNavigation cid={cid as string} show={showNav} />
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
