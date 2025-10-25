import { Task } from "@/types/task";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";
import { asyncStorageWrapper } from "../utils/asyncStorageWrapper";

export interface TodoStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (text: string, priority: Task["priority"]) => Promise<void>;
  toggleTask: (id: number | string) => Promise<void>;
  updateTask: (id: number | string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      fetchTasks: async () => {
        try {
          const data = await api.getTasks();
          set({ tasks: data });
        } catch (err) {
          console.warn("Fallo conexión, uso cache local");
        }
      },
      addTask: async (text, priority) => {
        const newTask = await api.addTask({ text, completed: false, priority });
        set({ tasks: [...get().tasks, newTask] });
      },
      toggleTask: async (id) => {
        const task = get().tasks.find((t) => t.id === id);
        if (!task) return;
        const updated = await api.updateTask(id, {
          completed: !task.completed,
        });
        set({ tasks: get().tasks.map((t) => (t.id === id ? updated : t)) });
      },
      updateTask: async (id, updates) => {
        const updated = await api.updateTask(id, updates);
        set({ tasks: get().tasks.map((t) => (t.id === id ? updated : t)) });
      },
      deleteTask: async (id) => {
        await api.deleteTask(id);
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
      },
    }),
    {
      name: "todo-storage",
      storage: asyncStorageWrapper,
    }
  )
);
