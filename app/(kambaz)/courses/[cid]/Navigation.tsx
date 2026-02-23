"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
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
    { label: "Grades", path: "grades" },
    { label: "People", path: "people/table" },
  ];
  return (
    <div
      id="wd-courses-navigation"
      className={`wd list-group fs-5 rounded-0 ${show ? "d-block" : "d-none"}`}
    >
      <ListGroup>
        {links.map((link) => {
          const href = `/courses/${cid}/${link.path}`;
          const isActive = pathname.includes(link.label.toLowerCase());
          return (
            <ListGroupItem
              key={link.label}
              as={Link}
              href={href}
              className={`border-0 ${isActive ? "text-danger bg-white" : "text-danger bg-black"}`}
            >
              {link.label}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
