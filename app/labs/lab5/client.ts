import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const fetchWelcome = async () => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const add = async (a: number, b: number) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/add/${a}/${b}`);
  return response.data;
};

export const subtract = async (a: number, b: number) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/subtract/${a}/${b}`);
  return response.data;
};

export const multiply = async (a: number, b: number) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/multiply/${a}/${b}`);
  return response.data;
};

export const divide = async (a: number, b: number) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/divide/${a}/${b}`);
  return response.data;
};

export const calculator = async (a: number, b: number, operation: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=${operation}`,
  );
  return response.data;
};

export const fetchAssignment = async () => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/assignment`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/lab5/assignment/title`, { title });
  return response.data;
};

export const updateScore = async (score: number) => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/lab5/assignment/score/${score}`);
  return response.data;
};

export const updateCompleted = async (completed: boolean) => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/lab5/assignment/completed/${completed}`);
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/todos`);
  return response.data;
};

export const fetchTodoById = async (id: number) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/lab5/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo: { title: string; completed: boolean }) => {
  const response = await axiosWithCredentials.post(`${HTTP_SERVER}/lab5/todos`, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: object) => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/lab5/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axiosWithCredentials.delete(`${HTTP_SERVER}/lab5/todos/${id}`);
  return response.data;
};
