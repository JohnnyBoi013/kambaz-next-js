"use client";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue="A1" />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={10}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </FormGroup>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl id="wd-points" type="number" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl as="select" id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormControl>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl
            as="select"
            id="wd-display-grade-as"
            defaultValue="Percentage"
          >
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Letter">Letter Grade</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
          </FormControl>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3">
            <FormControl
              as="select"
              id="wd-submission-type"
              defaultValue="Online"
              className="mb-3"
            >
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
              <option value="External Tool">External Tool</option>
            </FormControl>

            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
            <Form.Check
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
              defaultChecked
            />
            <Form.Check
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
            />
            <Form.Check
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
            />
            <Form.Check
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3">
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
              <FormControl id="wd-assign-to" defaultValue="Everyone" />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-due-date">Due</FormLabel>
              <FormControl
                id="wd-due-date"
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <FormLabel htmlFor="wd-available-from">
                    Available from
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                  <FormControl id="wd-available-until" type="datetime-local" />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}
