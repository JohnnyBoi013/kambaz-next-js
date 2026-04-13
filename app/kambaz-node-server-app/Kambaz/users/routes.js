import * as dao from "./dao.js";

export default function UserRoutes(app) {
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session.currentUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const profile = (req, res) => {
    const { currentUser } = req.session;
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }
    res.json(currentUser);
  };

  const updateProfile = async (req, res) => {
    const { currentUser } = req.session;
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }
    await dao.updateUser(currentUser._id, req.body);
    req.session.currentUser = { ...currentUser, ...req.body };
    res.json(req.session.currentUser);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  };

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(req.session["currentUser"] || { _id: userId, ...userUpdates });
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.deleteUser(userId);
    res.json(status);
  };

  // Register auth routes BEFORE /:userId to avoid conflicts
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/signup", signup);
  app.get("/api/users/profile", profile);
  app.put("/api/users/profile", updateProfile);

  // CRUD routes
  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
