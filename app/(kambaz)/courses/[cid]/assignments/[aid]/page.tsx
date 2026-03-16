"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../assignments/reducer";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

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

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const assignmentsState = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const assignments = (
    assignmentsState as unknown as { assignments: Assignment[] }
  ).assignments;

  const existingAssignment = assignments.find((a) => a._id === aid);

  const [assignment, setAssignment] = useState<Assignment>(
    existingAssignment || {
      _id: uuidv4(),
      title: "New Assignment",
      course: cid as string,
      description: "",
      points: 100,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
    },
  );

  const save = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <h2>{existingAssignment ? "Edit Assignment" : "New Assignment"}</h2>
      <hr />
      <label htmlFor="wd-name">Assignment Name</label>
      <FormControl
        id="wd-name"
        className="mb-3"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        className="form-control mb-3"
        rows={5}
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <label htmlFor="wd-points">Points</label>
      <FormControl
        id="wd-points"
        className="mb-3"
        type="number"
        value={assignment.points || 0}
        onChange={(e) =>
          setAssignment({ ...assignment, points: parseInt(e.target.value) })
        }
      />
      <label htmlFor="wd-due-date">Due Date</label>
      <FormControl
        id="wd-due-date"
        className="mb-3"
        type="date"
        value={assignment.dueDate || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, dueDate: e.target.value })
        }
      />
      <label htmlFor="wd-available-from">Available From</label>
      <FormControl
        id="wd-available-from"
        className="mb-3"
        type="date"
        value={assignment.availableFrom || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, availableFrom: e.target.value })
        }
      />
      <label htmlFor="wd-available-until">Available Until</label>
      <FormControl
        id="wd-available-until"
        className="mb-3"
        type="date"
        value={assignment.availableUntil || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, availableUntil: e.target.value })
        }
      />
      <hr />
      <Button
        variant="secondary"
        className="me-2"
        id="wd-cancel-assignment-btn"
        onClick={cancel}
      >
        Cancel
      </Button>
      <Button variant="danger" id="wd-save-assignment-btn" onClick={save}>
        Save
      </Button>
    </div>
  );
}
