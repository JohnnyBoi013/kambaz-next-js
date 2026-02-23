"use client";

import { ReactNode, useState, use } from "react";
import CourseNavigation from "./Navigation";
import TopBar from "../../TopBar";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);
  const course = courses.find((course) => course._id === cid);
  const [showCourseNav, setShowCourseNav] = useState(true);
  const [showKambazNav, setShowKambazNav] = useState(false);

  return (
    <>
      {/* Top bar with BOTH hamburgers - only on mobile */}
      <TopBar
        onToggleKambaz={() => setShowKambazNav(!showKambazNav)}
        onToggleCourse={() => setShowCourseNav(!showCourseNav)}
        showCourseToggle={true}
      />

      <div id="wd-courses" style={{ paddingTop: "60px" }} className="d-md-none">
        <div className="d-flex">
          <div>
            <CourseNavigation cid={cid} show={showCourseNav} />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>

      {/* Desktop layout */}
      <div id="wd-courses" className="d-none d-md-block">
        <h2 className="text-danger">
          <FaAlignJustify
            className="me-4 fs-4 mb-1"
            style={{ cursor: "pointer" }}
            onClick={() => setShowCourseNav(!showCourseNav)}
          />
          {course?.name} &gt; <Breadcrumb />
        </h2>
        <hr />
        <div className="d-flex">
          <div>
            <CourseNavigation cid={cid} show={showCourseNav} />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </>
  );
}
