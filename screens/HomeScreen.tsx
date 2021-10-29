import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import tw from "tailwind-react-native-classnames";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  type LoginScreenProps = StackNavigationProp<RootStackParamList, "Login">;
  const navigation = useNavigation<LoginScreenProps>();
  return (
    <View style={tw`flex flex-1 items-center justify-center`}>
      <Button
        onPress={() => {
          auth.signOut();
          navigation.replace("Login");
        }}
        title={"Log out"}
      />
    </View>
  );
};

export default HomeScreen;
