import { Platform } from "react-native";
const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:4000/tasks"
    : "http://localhost:4000/tasks";

export const api = {
  getTasks: async () => {
    const res = await fetch(API_URL);
    return res.json();
  },

  addTask: async (task: {
    text: string;
    completed: boolean;
    priority: string;
  }) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  },

  updateTask: async (
    id: number,
    updates: Partial<{ text: string; completed: boolean; priority: string }>
  ) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  deleteTask: async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  },
};
