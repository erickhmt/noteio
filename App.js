import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { AuthProvider } from "./context/auth";
import { HomeScreen } from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();


export default function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <AuthProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
