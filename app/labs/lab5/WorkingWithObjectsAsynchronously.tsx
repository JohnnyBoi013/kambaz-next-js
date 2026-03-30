"use client";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { fetchAssignment, updateTitle, updateScore, updateCompleted } from "./client";

interface Assignment {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
}

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState("NodeJS Assignment");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const getAssignment = async () => {
    const data = await fetchAssignment();
    setAssignment(data);
    setTitle(data.title);
    setScore(data.score);
    setCompleted(data.completed);
  };

  const changeTitle = async () => {
    const data = await updateTitle(title);
    setAssignment(data);
  };

  const changeScore = async () => {
    const data = await updateScore(score);
    setAssignment(data);
  };

  const changeCompleted = async () => {
    const data = await updateCompleted(completed);
    setAssignment(data);
  };

  return (
    <div id="wd-working-with-objects-async">
      <h3>Working With Objects Asynchronously</h3>
      <div className="d-flex gap-2 mb-2">
        <Button onClick={getAssignment} id="wd-fetch-assignment-click">
          Fetch Assignment
        </Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="wd-assignment-title"
        />
        <Button onClick={changeTitle} id="wd-update-title-click">
          Update Title
        </Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          type="number"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
          id="wd-assignment-score"
          style={{ width: "100px" }}
        />
        <Button onClick={changeScore} id="wd-update-score-click">
          Update Score
        </Button>
      </div>
      <div className="d-flex gap-2 mb-2 align-items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          id="wd-assignment-completed"
        />
        <label htmlFor="wd-assignment-completed">Completed</label>
        <Button onClick={changeCompleted} id="wd-update-completed-click">
          Update Completed
        </Button>
      </div>
      {assignment && (
        <pre id="wd-assignment-json">{JSON.stringify(assignment, null, 2)}</pre>
      )}
      <hr />
    </div>
  );
}
