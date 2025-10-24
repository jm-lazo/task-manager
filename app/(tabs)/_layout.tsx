import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = ()=>{
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "green",
            tabBarStyle: {
              backgroundColor: "blue",
              borderTopWidth: 1,
              borderTopColor: "yellow",
              height: 90,
              paddingBottom: 30,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
            headerShown: false,
          }}
        >
            <Tabs.Screen
            name="index"
            options={{
                title:"TODOS",
                tabBarIcon:({color, size})=> (
                    <Ionicons name="flash-outline" size={size} color={color}/>
                )
            }}
            />
            <Tabs.Screen
            name="settings"
            options={{
                title:"SETTINGS",
                tabBarIcon:({color, size})=> (
                    <Ionicons name="settings" size={size} color={color}/>
                )
            }}
            />

        </Tabs>
    )
}

export default TabsLayout;