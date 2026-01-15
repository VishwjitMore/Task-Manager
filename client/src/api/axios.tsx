import axios from "axios";

const API = "http://localhost:3000";

export type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export type CreateTaskData = {
  title: string;
};

export type UpdateTaskData = {
  title?: string;
  completed?: boolean;
};

export const getTasks = () => {
  return axios.get<Task[]>(`${API}/`);
};

export const createTask = (data: CreateTaskData) => {
  return axios.post<Task>(`${API}/tasks`, data);
};

export const updateTask = (id: string, data: UpdateTaskData) => {
  return axios.patch<Task>(`${API}/tasks/${id}`, data);
};

export const deleteTask = (id: string) => {
  return axios.delete(`${API}/tasks/${id}`);
};
