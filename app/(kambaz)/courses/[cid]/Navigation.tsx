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
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className={`wd list-group fs-5 rounded-0 ${show ? "d-block" : "d-none"}`}
    >
      <ListGroup>
        {links.map((link) => {
          const href = `/courses/${cid}/${link.charAt(0).toLowerCase() + link.slice(1)}`;
          const isActive = pathname.includes(link);
          return (
            <ListGroupItem
              key={link}
              as={Link}
              href={href}
              className={`border-0 ${isActive ? "text-danger bg-white" : "text-danger bg-black"}`}
            >
              {link}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
