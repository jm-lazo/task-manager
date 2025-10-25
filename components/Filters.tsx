import { useTodoStore } from "@/store/useTodoStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Status = "all" | "completed" | "pending";
type Priority = "Low" | "Medium" | "High";

interface Props {
}

const Filter: React.FC<Props> = ({}) => {
  const {
    statusFilter,
    priorityFilter,
    setStatusFilter,
    setPriorityFilter,
  } = useTodoStore();

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        {(["all", "completed", "pending"] as Status[]).map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, statusFilter === item && styles.activeButton]}
            onPress={() => setStatusFilter(item)}
          >
            <Text
              style={[styles.buttonText, statusFilter === item && styles.activeText]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.statusContainer}>
        {(["Low", "Medium", "High"] as Priority[]).map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              priorityFilter === item && item === "Low" && styles.activeButtonLow,
              priorityFilter === item && item === "Medium" && styles.activeButtonMedium,
              priorityFilter === item && item === "High" && styles.activeButtonHigh,
            ]}
            onPress={() => priorityFilter === item ? setPriorityFilter("all") : setPriorityFilter(item)}
          >
            <Text
              style={[styles.buttonText, priorityFilter === item && styles.activeText]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    width:100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ddd",
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  activeButtonLow: {
    backgroundColor: "#4CAF50",
  },
  activeButtonMedium: {
    backgroundColor: "#FFC107",
  },
  activeButtonHigh: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  priorityContainer: {
    alignItems: "center",
  },
  dropdown: {
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 6,
  },
  dropdownOptions: {
    marginTop: 5,
    backgroundColor: "#eee",
    borderRadius: 6,
    width: "60%",
    alignItems: "center",
  },
  option: {
    padding: 6,
  },
});

export default Filter;
