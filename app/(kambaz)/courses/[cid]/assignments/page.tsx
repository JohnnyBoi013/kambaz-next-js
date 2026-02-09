"use client";

import { FaPlus, FaSearch } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Controls Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white">
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Assignment" type="text" />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignment List */}
      <ul className="list-group rounded-0">
        {/* Assignment Group Header */}
        <li className="list-group-item p-3 bg-secondary">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-4" />
            <strong>ASSIGNMENTS</strong>
            <div className="ms-auto">
              <span className="border border-dark rounded p-1 me-2">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <BsThreeDotsVertical />
            </div>
          </div>
        </li>

        {/* Assignment 1 */}
        <li className="list-group-item p-3 border-start border-success border-4">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-4 text-success" />
            <div className="flex-fill">
              <Link
                href="/courses/1234/assignments/1"
                className="text-decoration-none text-dark fw-bold"
              >
                A1 - ENV + HTML
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> May 6 at 12:00am |
              </div>
              <div className="text-muted small">
                <strong>Due</strong> May 13 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <FaCheckCircle className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </div>
        </li>

        {/* Assignment 2 */}
        <li className="list-group-item p-3 border-start border-success border-4">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-4 text-success" />
            <div className="flex-fill">
              <Link
                href="/courses/1234/assignments/2"
                className="text-decoration-none text-dark fw-bold"
              >
                A2 - CSS + BOOTSTRAP
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> May 13 at 12:00am |
              </div>
              <div className="text-muted small">
                <strong>Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <FaCheckCircle className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </div>
        </li>

        {/* Assignment 3 */}
        <li className="list-group-item p-3 border-start border-success border-4">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-4 text-success" />
            <div className="flex-fill">
              <Link
                href="/courses/1234/assignments/3"
                className="text-decoration-none text-dark fw-bold"
              >
                A3 - JAVASCRIPT + REACT
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> May 20 at 12:00am |
              </div>
              <div className="text-muted small">
                <strong>Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <FaCheckCircle className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
