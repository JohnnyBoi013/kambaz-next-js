"use client";
import { TodosProvider, useTodos } from "./todosContext";
import { ListGroup, Button, FormControl } from "react-bootstrap";

function TodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();
  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List (React Context)</h2>
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

export default function ReactContextTodoList() {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}
