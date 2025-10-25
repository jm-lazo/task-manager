export interface Task {
  id: string | number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}
