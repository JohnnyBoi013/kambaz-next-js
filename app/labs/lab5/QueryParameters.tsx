"use client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { calculator } from "./client";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function QueryParameters() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(5);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string | null>(null);

  const calculate = async () => {
    const res = await calculator(a, b, operation);
    setResult(res);
  };

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <div className="mb-2">
        <a
          href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=add`}
          className="d-block"
        >
          Add {a} + {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=subtract`}
          className="d-block"
        >
          Subtract {a} - {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=multiply`}
          className="d-block"
        >
          Multiply {a} * {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=divide`}
          className="d-block"
        >
          Divide {a} / {b}
        </a>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          type="number"
          value={a}
          onChange={(e) => setA(parseInt(e.target.value))}
          placeholder="a"
          style={{ width: "80px" }}
        />
        <select
          className="form-control"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{ width: "120px" }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <FormControl
          type="number"
          value={b}
          onChange={(e) => setB(parseInt(e.target.value))}
          placeholder="b"
          style={{ width: "80px" }}
        />
        <Button onClick={calculate}>Calculate</Button>
      </div>
      {result !== null && <div id="wd-query-result">Result: {result}</div>}
      <hr />
    </div>
  );
}
