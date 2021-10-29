import React from "react";
import { View, Text, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import * as Google from "expo-google-app-auth";
import { auth } from "../firebase";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/core";

import { RootStackParamList } from "../App";

import { StackNavigationProp } from "@react-navigation/stack";

const LoginScreen = () => {
  type HomeScreenProps = StackNavigationProp<RootStackParamList, "Home">;
  const navigation = useNavigation<HomeScreenProps>();
  function isUserEqual(googleUser: any, firebaseUser: any) {
    if (firebaseUser) {
      let providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser: any) {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    let unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        let credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
        behavior: "web",
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  const user = auth.currentUser;
  if (user) {
    navigation.replace("Home");
  }
  return (
    <View style={tw`flex flex-1 items-center justify-center`}>
      <Button onPress={signInWithGoogleAsync} title={"Sign in With Google"} />
    </View>
  );
};

export default LoginScreen;
