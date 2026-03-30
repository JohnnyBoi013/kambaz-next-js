"use client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { fetchAssignment, updateTitle, updateScore, updateCompleted } from "./client";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState<{
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
    score: number;
  } | null>(null);
  const [newTitle, setNewTitle] = useState("NodeJS Assignment");
  const [newScore, setNewScore] = useState(0);
  const [newCompleted, setNewCompleted] = useState(false);

  const getAssignment = async () => {
    const data = await fetchAssignment();
    setAssignment(data);
  };

  const changeTitle = async () => {
    const data = await updateTitle(newTitle);
    setAssignment(data);
  };

  const changeScore = async () => {
    const data = await updateScore(newScore);
    setAssignment(data);
  };

  const changeCompleted = async () => {
    const data = await updateCompleted(newCompleted);
    setAssignment(data);
  };

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <div className="mb-2">
        <a href={`${HTTP_SERVER}/lab5/assignment`} className="d-block">
          Get Assignment
        </a>
        <a href={`${HTTP_SERVER}/lab5/assignment/title`} className="d-block">
          Get Title
        </a>
        <a href={`${HTTP_SERVER}/lab5/assignment/score`} className="d-block">
          Get Score
        </a>
        <a href={`${HTTP_SERVER}/lab5/assignment/completed`} className="d-block">
          Get Completed
        </a>
      </div>
      <div className="d-flex gap-2 mb-2 align-items-center">
        <Button onClick={getAssignment}>Get Assignment</Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Title"
        />
        <Button onClick={changeTitle}>Update Title</Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(parseInt(e.target.value))}
          placeholder="New Score"
          style={{ width: "100px" }}
        />
        <Button onClick={changeScore}>Update Score</Button>
      </div>
      <div className="d-flex gap-2 mb-2 align-items-center">
        <input
          type="checkbox"
          checked={newCompleted}
          onChange={(e) => setNewCompleted(e.target.checked)}
          id="wd-assignment-completed"
        />
        <label htmlFor="wd-assignment-completed">Completed</label>
        <Button onClick={changeCompleted}>Update Completed</Button>
      </div>
      {assignment && (
        <div id="wd-assignment-json">
          <pre>{JSON.stringify(assignment, null, 2)}</pre>
        </div>
      )}
      <hr />
    </div>
  );
}
