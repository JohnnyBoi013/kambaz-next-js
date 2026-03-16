"use client";
import useTodoStore from "./useTodoStore";
import { ListGroup, Button, FormControl } from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } =
    useTodoStore();
  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List (Zustand)</h2>
      <ListGroup>
        <ListGroup.Item>
          <Button onClick={() => addTodo(todo)} id="wd-add-todo-click">
            Add
          </Button>
          <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroup.Item>
        {todos.map((t) => (
          <ListGroup.Item key={t.id}>
            <Button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click">
              Delete
            </Button>
            <Button onClick={() => setTodo(t)} id="wd-set-todo-click">
              Edit
            </Button>
            {t.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
