"use client";

import { FaPlus, FaSearch } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import assignments from "../../assignments.json";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  availableDate: string;
  dueDate: string;
  points: number;
  modules: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = (assignments as Assignment[]).filter(
    (a) => a.course === cid,
  );

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

        {courseAssignments.map((assignment) => (
          <li
            key={assignment._id}
            className="list-group-item p-3 border-start border-success border-4"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-4 text-success" />
              <div className="flex-fill">
                <Link
                  href={`/courses/${cid}/assignments/${assignment._id}`}
                  className="text-decoration-none text-dark fw-bold"
                >
                  {assignment.title}
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">{assignment.modules}</span> |{" "}
                  <strong>Not available until</strong>{" "}
                  {assignment.availableDate} |
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> {assignment.dueDate} |{" "}
                  {assignment.points} pts
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
                <FaCheckCircle className="text-success me-2 fs-5" />
                <BsThreeDotsVertical />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
