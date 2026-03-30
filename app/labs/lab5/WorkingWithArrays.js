let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const filtered = todos.filter(
        (t) => t.completed === (completed === "true"),
      );
      res.json(filtered);
      return;
    }
    res.json(todos);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    res.json(todo);
  });

  app.get("/lab5/todos/:id/title", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    res.json(todo.title);
  });

  app.get("/lab5/todos/:id/completed", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    res.json(todo.completed);
  });

  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: todos.length + 1 };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  });

  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    const deleted = todos[index];
    todos = todos.filter((t) => t.id !== parseInt(id));
    res.json(deleted);
  });
}
