import React from "react";
import {
  Text,
  StatusBar as AndroidStatusBarHeight,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Home: undefined;
};
const App = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider
      style={{
        marginTop:
          Platform.OS === "android" ? AndroidStatusBarHeight.currentHeight : 0,
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
