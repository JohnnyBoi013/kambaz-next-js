"use client";
import { useState } from "react";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./client";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function WorkingWithArrays() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(1);
  const [newTodoTitle, setNewTodoTitle] = useState("New Todo");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
    setErrorMessage(null);
  };

  const getTodo = async () => {
    try {
      const data = await fetchTodoById(todoId);
      setTodos([data]);
      setErrorMessage(null);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response: { data: { message: string } } }).response?.data
          ?.message
      ) {
        setErrorMessage(
          (err as { response: { data: { message: string } } }).response.data
            .message,
        );
      }
    }
  };

  const addTodo = async () => {
    const data = await createTodo({ title: newTodoTitle, completed: false });
    setTodos([...todos, data]);
  };

  const changeTodo = async (id: number, changes: Partial<Todo>) => {
    const updated = await updateTodo(id, changes);
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working With Arrays</h3>
      <div className="mb-2">
        <a href={`${HTTP_SERVER}/lab5/todos`} className="d-block">
          Get All Todos
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/todos?completed=true`}
          className="d-block"
        >
          Get Completed Todos
        </a>
        <a href={`${HTTP_SERVER}/lab5/todos/${todoId}`} className="d-block">
          Get Todo by ID
        </a>
      </div>
      {errorMessage && (
        <div className="alert alert-danger" id="wd-todo-error-message">
          {errorMessage}
        </div>
      )}
      <div className="d-flex gap-2 mb-2">
        <Button onClick={getTodos}>Get All Todos</Button>
        <FormControl
          type="number"
          value={todoId}
          onChange={(e) => setTodoId(parseInt(e.target.value))}
          style={{ width: "80px" }}
        />
        <Button onClick={getTodo}>Get Todo by ID</Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New Todo Title"
        />
        <Button onClick={addTodo} variant="success">
          Add Todo
        </Button>
      </div>
      <ListGroup id="wd-todos">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  changeTodo(todo.id, { completed: e.target.checked })
                }
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
