import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import useTheme from "@/hooks/useTheme";
import { Task } from "@/types/task";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from '../../store/useTodoStore';


export default function Index() {
    const { tasks, fetchTasks, toggleTask, updateTask, deleteTask, statusFilter, priorityFilter } = useTodoStore();
    const {colors} = useTheme();
    const homeStyles= createHomeStyles(colors);
    const [editingId, setEditingId] = useState< string | number | null>(null);
    const [editText, setEditText] = useState("");
    const [refreshing, setRefreshing] = useState(false);   

    useEffect(() => {
        fetchTasks();
      }, []);

    const handleToggleTodo = async (id: string | number) => {
        try {
          toggleTask( id );
        } catch (error) {
          console.log("Error toggling todo", error);
          Alert.alert("Error", "Failed to toggle todo");
        }
      };
    const handleDeleteTodo = async (id: string | number) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTask( id ) },
    ]);
    };  

    const handleEditTodo = (todo: Task) => {
    setEditText(todo.text);
    setEditingId(todo.id);
    };

    const handleSaveEdit = async () => {       
    if (editingId) {
        try {
        updateTask(editingId, { text: editText.trim() });
        setEditingId(null);
        setEditText("");
        } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo");
        }
    }
    };

    const handlePriorityEdit = async ( id:string | number, priority: "High" | "Medium" | "Low") => {       
       try {
        updateTask(id, { priority });
        } catch (error) {
        console.log("Error updating todo", error);
        }
    };

    const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    };  

    const onRefresh = useCallback(async () => {
        try {
          setRefreshing(true);
          fetchTasks();
        } catch (err) {
          console.warn("Error al refrescar:", err);
        } finally {
          setRefreshing(false);
        }
      }, []);

      const getPriorityGradient = (priority: "Low" | "Medium" | "High"): [string, string] => {
        switch (priority) {
          case "Low":
            return ["#4CAF50", "#81C784"];
          case "Medium":
            return ["#FFC107", "#FFD54F"];
          case "High":
            return ["#F44336", "#E57373"];
          default:
            return ["#CCCCCC", "#EEEEEE"];
        }
      }; 

    const renderTodoItem = ({ item }: { item: Task }) => {
        const isEditing = editingId === item.id;
        return (
            <View style={homeStyles.todoItemWrapper}>
            <LinearGradient
              colors={colors.gradients.surface}
              style={homeStyles.todoItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
            <View style={homeStyles.card}>
                <View>
                    <View style={homeStyles.priorityChipsContainer}>
                        {(["Low", "Medium", "High"] as const).map((priority) => {
                        const isSelected = item.priority === priority;
                        return (
                            <TouchableOpacity
                            key={priority}
                            activeOpacity={0.8}
                            onPress={() => handlePriorityEdit(item.id, priority)} // reemplazá con handlePriorityChange
                            >
                            <LinearGradient
                                colors={
                                isSelected
                                    ? getPriorityGradient(priority)
                                    : colors.gradients.empty
                                }
                                style={[
                                homeStyles.priorityChip,
                                isSelected && { opacity: 1 },
                                ]}
                            >
                                <Text
                                style={[
                                    homeStyles.priorityChipText,
                                    isSelected ? { color: "#fff" } : { color: colors.textMuted },
                                ]}
                                >
                                {priority}
                                </Text>
                            </LinearGradient>
                            </TouchableOpacity>
                        );
                        })}
                    </View>
                </View>
                <View style={homeStyles.todoMainContent}>
                    <TouchableOpacity
                    style={homeStyles.checkbox}
                    activeOpacity={0.7}
                    onPress={() => handleToggleTodo(item.id)}
                    >
                    <LinearGradient
                        colors={item.completed ? colors.gradients.success : colors.gradients.muted}
                        style={[
                        homeStyles.checkboxInner,
                        { borderColor: item.completed ? "transparent" : colors.border },
                        ]}
                    >
                        {item.completed && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </LinearGradient>
                    </TouchableOpacity>
            
                    {isEditing ? (
                    <View style={homeStyles.editContainer}>
                        <TextInput
                        style={homeStyles.editInput}
                        value={editText}
                        onChangeText={setEditText}
                        autoFocus
                        multiline
                        placeholder="Edit your todo..."
                        placeholderTextColor={colors.textMuted}
                        />
                        <View style={homeStyles.editButtons}>
                        <TouchableOpacity onPress={editText ? handleSaveEdit : () => null} activeOpacity={0.8}>
                            <LinearGradient
                            colors={editText ? colors.gradients.success : colors.gradients.muted}
                            style={homeStyles.editButton}
                            >
                            <Ionicons name="checkmark" size={16} color="#fff" />
                            <Text style={homeStyles.editButtonText}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
            
                        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                            <Ionicons name="close" size={16} color="#fff" />
                            <Text style={homeStyles.editButtonText}>Cancel</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                    </View>
                    ) : (
                    <View style={homeStyles.todoTextContainer}>
                        <Text
                        style={[
                            homeStyles.todoText,
                            item.completed && {
                            textDecorationLine: "line-through",
                            color: colors.textMuted,
                            opacity: 0.6,
                            },
                        ]}
                        >
                        {item.text}
                        </Text>
            
                        <View style={homeStyles.todoActions}>
                        <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                            <Ionicons name="pencil" size={14} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                            <Ionicons name="trash" size={14} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                </View>
              </View>
            </LinearGradient>
          </View>
          
          
        );
      };

      const filteredTasks = React.useMemo(() => {
        return tasks.filter((t) => {
          const matchPriority =
            priorityFilter === "all" || t.priority === priorityFilter;
      
          const matchStatus =
            statusFilter === "all" ||
            (statusFilter === "completed" && t.completed) ||
            (statusFilter === "pending" && !t.completed);
      
          return matchPriority && matchStatus;
        });
      }, [tasks, priorityFilter, statusFilter]);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
         <StatusBar barStyle={colors.statusBarStyle}/>
         <SafeAreaView style={homeStyles.safeArea}>
            <Header />
            <TodoInput />
            <Filters />
            <FlatList
            data={filteredTasks}
            renderItem={renderTodoItem}
            style={homeStyles.todoList}
            contentContainerStyle={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyState />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        </SafeAreaView>
    </LinearGradient>
   
   
  );
}