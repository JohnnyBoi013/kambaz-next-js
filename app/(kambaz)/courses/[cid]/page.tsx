"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../../store";
import { deleteAssignment } from "./assignments/reducer";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash, FaPlus } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const assignmentsState = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const assignments = (
    assignmentsState as unknown as { assignments: Assignment[] }
  ).assignments;
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedId) dispatch(deleteAssignment(selectedId));
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between mb-3">
        <h2>Assignments</h2>
        <Button
          variant="danger"
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}
          id="wd-add-assignment-click"
        >
          <FaPlus className="me-2" />
          Assignment
        </Button>
      </div>

      {showConfirm && (
        <div className="alert alert-warning">
          <p>Are you sure you want to delete this assignment?</p>
          <Button variant="danger" className="me-2" onClick={confirmDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
        </div>
      )}

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {assignments
          .filter((a: Assignment) => a.course === cid)
          .map((assignment: Assignment) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment p-0 mb-2 fs-5 border-gray"
            >
              <div className="d-flex align-items-center p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <BsCheckCircle className="text-success me-2" />
                <span
                  className="flex-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/courses/${cid}/assignments/${assignment._id}`)
                  }
                >
                  {assignment.title}
                </span>
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(assignment._id)}
                />
              </div>
              <div className="p-3">
                <span className="text-muted">
                  Due: {assignment.dueDate} | {assignment.points} pts
                </span>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
