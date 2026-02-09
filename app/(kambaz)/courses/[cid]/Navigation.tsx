"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({
  cid,
  show,
}: {
  cid: string;
  show?: boolean;
}) {
  const pathname = usePathname();

  const links = [
    { label: "Home", path: "home" },
    { label: "Modules", path: "modules" },
    { label: "Piazza", path: "piazza" },
    { label: "Zoom", path: "zoom" },
    { label: "Assignments", path: "assignments" },
    { label: "Quizzes", path: "quizzes" },
    { label: "People", path: "people/table" },
  ];

  return (
    <div
      id="wd-courses-navigation"
      className={`wd list-group fs-5 rounded-0 ${show ? "d-block" : "d-none"}`}
    >
      {links.map((link) => {
        const href = `/courses/${cid}/${link.path}`;
        const isActive = pathname.includes(href);

        return (
          <Link
            key={link.path}
            href={href}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
