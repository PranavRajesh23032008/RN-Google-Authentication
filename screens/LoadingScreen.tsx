import React from "react";
import { View, ActivityIndicator } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/core";

const LoadingScreen = () => {
  type LoginScreenProps = StackNavigationProp<RootStackParamList, "Login">;
  const navigation = useNavigation<LoginScreenProps>();
  auth.onAuthStateChanged((user) => {
    if (user) {
      navigation.replace("Home");
    } else {
      navigation.replace("Login");
    }
  });
  return (
    <View style={tw`flex flex-1 items-center justify-center`}>
      <ActivityIndicator size={30} color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;
