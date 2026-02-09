"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/account"
        id="wd-account-link"
      >
        Account
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/dashboard"
        id="wd-dashboard-link"
      >
        Dashboard
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/courses"
        id="wd-course-link"
      >
        Courses
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/calendar"
        id="wd-calendar-link"
      >
        Calendar
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/inbox"
        id="wd-inbox-link"
      >
        Inbox
      </ListGroupItem>

      <ListGroupItem
        className="bg-black border-0 text-center text-white"
        as="a"
        href="/labs"
        id="wd-labs-link"
      >
        Labs
      </ListGroupItem>
    </ListGroup>
  );
}
