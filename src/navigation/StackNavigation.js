import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../components/Login";
import TabBar from "./TabBar";
import Signup from "../components/SignUp";
import QRCodeScanner from "../components/QrCode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabBar" component={TabBar} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="qrcode" component={QRCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}