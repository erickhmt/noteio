import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View } from "react-native";

import ContaScreen from "./ContaScreen";
import IssuesAndTasksScreen from "./IssuesAndTasksScreen";
import MarkdownEditorScreen from "./MarkdownEditorScreen";
import RepositorioDetailScreen from "./RepositorioDetailScreen";
import RepositoriosScreen from "./RepositoriosScreen";

const Tab = createBottomTabNavigator();
const RepositoriosStack = createNativeStackNavigator();

function RepositoriosTabStack() {
  return (
    <RepositoriosStack.Navigator>
      <RepositoriosStack.Screen
        name="Repositórios"
        component={RepositoriosScreen}
        options={{
          headerShown: false,
        }}
      />
      <RepositoriosStack.Screen
        name="RepositorioDetail"
        component={RepositorioDetailScreen}
        options={{
          title: "Detalhes",
          headerShown: true,
          headerBackTitle: "Back",
        }}
      />
      <RepositoriosStack.Screen
        name="IssuesAndTasks"
        component={IssuesAndTasksScreen}
        options={{
          title: "Issues and tasks",
          headerBackTitle: "Back",
        }}
      />
      <RepositoriosStack.Screen
        name="Documentacao"
        component={MarkdownEditorScreen}
        options={{
          title: "Readme.md",
          headerBackTitle: "Back",
        }}
      />
    </RepositoriosStack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Repositorios"
        screenOptions={{
          tabBarActiveTintColor: "#3182ce",
        }}
      >
        <Tab.Screen
          name="Repositorios"
          component={RepositoriosTabStack}
          options={{
            // headerShown: false,
            headerTitle: "Repositórios",
            tabBarLabel: "Repositórios",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="logo-github" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Conta"
          component={ContaScreen}
          options={{
            tabBarLabel: "Conta",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default HomeScreen;
