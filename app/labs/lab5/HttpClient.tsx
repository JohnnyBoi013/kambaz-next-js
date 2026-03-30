"use client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function HttpClient() {
  const [url, setUrl] = useState(`${HTTP_SERVER}/lab5/welcome`);
  const [response, setResponse] = useState<string | null>(null);

  const fetchUrl = async () => {
    try {
      const res = await axios.get(url);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err}`);
    }
  };

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <Button onClick={fetchUrl}>Fetch</Button>
      </div>
      {response && (
        <pre id="wd-http-response" className="bg-light p-2">
          {response}
        </pre>
      )}
      <hr />
    </div>
  );
}
