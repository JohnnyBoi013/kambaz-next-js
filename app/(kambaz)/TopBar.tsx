"use client";

import { FaBars } from "react-icons/fa";

export default function TopBar({
  onToggleKambaz,
  onToggleCourse,
  showCourseToggle = false,
}: {
  onToggleKambaz: () => void;
  onToggleCourse?: () => void;
  showCourseToggle?: boolean;
}) {
  return (
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-black position-fixed top-0 start-0 end-0 d-md-none"
      style={{ zIndex: 1100 }}
    >
      {/* Left hamburger - toggles Kambaz Navigation */}
      <FaBars
        className="text-white fs-3"
        style={{ cursor: "pointer" }}
        onClick={onToggleKambaz}
      />

      {/* Right hamburger - toggles Course Navigation */}
      {showCourseToggle && onToggleCourse && (
        <FaBars
          className="text-white fs-3"
          style={{ cursor: "pointer" }}
          onClick={onToggleCourse}
        />
      )}
    </div>
  );
}
