import { users } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllUsers = () => users;

export const findUserById = (userId) =>
  users.find((user) => user._id === userId);

export const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
  users.find(
    (user) => user.username === username && user.password === password,
  );

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  users.push(newUser);
  return newUser;
};

export const updateUser = (userId, user) => {
  const index = users.findIndex((u) => u._id === userId);
  if (index === -1) return null;
  users[index] = { ...users[index], ...user };
  return users[index];
};

export const deleteUser = (userId) => {
  const index = users.findIndex((u) => u._id === userId);
  if (index === -1) return null;
  const deleted = users[index];
  users.splice(index, 1);
  return deleted;
};

export const findUsersByRole = (role) =>
  users.filter((user) => user.role === role);
