"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Button,
} from "react-bootstrap";
import { assignments } from "../../../../database";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
  course: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = (assignments as Assignment[]).find((a) => a._id === aid);

  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div id="wd-assignments-editor" className="p-4">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue={assignment.title} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={6}
          defaultValue={assignment.description}
        />
      </FormGroup>

      <FormGroup className="mb-3 row">
        <FormLabel
          className="col-sm-3 col-form-label text-end"
          htmlFor="wd-points"
        >
          Points
        </FormLabel>
        <div className="col-sm-9">
          <FormControl
            id="wd-points"
            type="number"
            defaultValue={assignment.points}
          />
        </div>
      </FormGroup>

      <FormGroup className="mb-3 row">
        <FormLabel
          className="col-sm-3 col-form-label text-end"
          htmlFor="wd-assignment-group"
        >
          Assignment Group
        </FormLabel>
        <div className="col-sm-9">
          <FormSelect id="wd-assignment-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </div>
      </FormGroup>

      <FormGroup className="mb-3 row">
        <FormLabel
          className="col-sm-3 col-form-label text-end"
          htmlFor="wd-submission-type"
        >
          Submission Type
        </FormLabel>
        <div className="col-sm-9">
          <FormSelect id="wd-submission-type">
            <option value="ONLINE">Online</option>
            <option value="ON_PAPER">On Paper</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </FormSelect>
        </div>
      </FormGroup>

      <FormGroup className="mb-3 row">
        <FormLabel
          className="col-sm-3 col-form-label text-end"
          htmlFor="wd-due-date"
        >
          Due Date
        </FormLabel>
        <div className="col-sm-9">
          <FormControl
            id="wd-due-date"
            type="date"
            defaultValue={assignment.dueDate}
          />
        </div>
      </FormGroup>

      <FormGroup className="mb-3 row">
        <FormLabel
          className="col-sm-3 col-form-label text-end"
          htmlFor="wd-available-date"
        >
          Available From
        </FormLabel>
        <div className="col-sm-9">
          <FormControl
            id="wd-available-date"
            type="date"
            defaultValue={assignment.availableDate}
          />
        </div>
      </FormGroup>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="danger">Save</Button>
        </Link>
      </div>
    </div>
  );
}
