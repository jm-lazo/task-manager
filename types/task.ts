export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}
