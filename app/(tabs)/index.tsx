import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from '../../store/useTodoStore';


export default function Index() {
    const { tasks, fetchTasks, addTask, toggleTask, updateTask, deleteTask } = useTodoStore();
    const {toggleDarkMode, colors} = useTheme();
    const homeStyles= createHomeStyles(colors);
    useEffect(() => {
        fetchTasks();
      }, []);

      console.log(tasks);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
         <StatusBar barStyle={colors.statusBarStyle}/>
         <SafeAreaView style={homeStyles.safeArea}>
            <Header />
            <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <Text onPress={toggleDarkMode}>Edit app/index.tsx to edit this index tabs</Text>
            </View>
        </SafeAreaView>
    </LinearGradient>
   
   
  );
}