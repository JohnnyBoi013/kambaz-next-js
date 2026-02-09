"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaBook,
  FaCalendar,
  FaInbox,
  FaFlask,
} from "react-icons/fa";
import "./styles.css";

export default function KambazNavigation({ show }: { show?: boolean }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  const links = [
    {
      href: "/account",
      icon: <FaUserCircle size={24} />,
      label: "Account",
      whiteIcon: true,
    },
    {
      href: "/dashboard",
      icon: <FaTachometerAlt size={24} />,
      label: "Dashboard",
      whiteIcon: false,
    },
    {
      href: "/courses",
      icon: <FaBook size={24} />,
      label: "Courses",
      whiteIcon: false,
    },
    {
      href: "/calendar",
      icon: <FaCalendar size={24} />,
      label: "Calendar",
      whiteIcon: false,
    },
    {
      href: "/inbox",
      icon: <FaInbox size={24} />,
      label: "Inbox",
      whiteIcon: false,
    },
    {
      href: "/labs",
      icon: <FaFlask size={24} />,
      label: "Labs",
      whiteIcon: false,
    },
  ];

  return (
    <ListGroup
      className={`wd-kambaz-navigation rounded-0 position-fixed bottom-0 top-0 ${show ? "d-block" : "d-none d-md-block"}`}
      style={{ zIndex: 1050 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center py-4"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      {links.map((link) => (
        <ListGroupItem
          key={link.href}
          className={`border-0 text-center ${
            isActive(link.href) ? "bg-white text-danger" : "bg-black text-white"
          }`}
          as="a"
          href={link.href}
          id={`wd-${link.label.toLowerCase()}-link`}
        >
          <div
            className={
              isActive(link.href)
                ? "text-danger"
                : link.whiteIcon
                  ? "text-white"
                  : "text-danger"
            }
          >
            {link.icon}
          </div>
          <div className="wd-navigation-label">{link.label}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
