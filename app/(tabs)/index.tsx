import { useEffect } from "react";
import { Text, View } from "react-native";
import { useTodoStore } from '../../store/useTodoStore';

export default function Index() {
    const { tasks, fetchTasks, addTask, toggleTask, updateTask, deleteTask } = useTodoStore();
    useEffect(() => {
        fetchTasks();
      }, []);

      console.log(tasks);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this index tabs</Text>
    </View>
  );
}