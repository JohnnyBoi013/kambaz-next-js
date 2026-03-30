"use client";
import { useState } from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./client";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(1);
  const [newTodoTitle, setNewTodoTitle] = useState("New Task");
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

  const changeTodoCompleted = async (id: number, completed: boolean) => {
    const updated = await updateTodo(id, { completed });
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div id="wd-working-with-arrays-async">
      <h3>Working With Arrays Asynchronously</h3>
      {errorMessage && (
        <div className="alert alert-danger" id="wd-todo-error-message">
          {errorMessage}
        </div>
      )}
      <div className="d-flex gap-2 mb-2">
        <Button onClick={getTodos} id="wd-fetch-todos-click">
          Fetch Todos
        </Button>
        <FormControl
          type="number"
          value={todoId}
          onChange={(e) => setTodoId(parseInt(e.target.value))}
          id="wd-todo-id"
          style={{ width: "80px" }}
        />
        <Button onClick={getTodo} id="wd-fetch-todo-click">
          Fetch Todo by ID
        </Button>
      </div>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          id="wd-todo-title"
          placeholder="New Todo Title"
        />
        <Button onClick={addTodo} variant="success" id="wd-create-todo-click">
          Create Todo
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
                  changeTodoCompleted(todo.id, e.target.checked)
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
