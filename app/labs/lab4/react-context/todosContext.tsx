"use client";
import { createContext, useContext, useState } from "react";

type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType>({} as TodosContextType);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "" });

  const addTodo = (todo: Todo) => {
    const newTodos = [
      ...todos,
      { ...todo, id: new Date().getTime().toString() },
    ];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  return (
    <TodosContext.Provider
      value={{ todos, todo, setTodo, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}
