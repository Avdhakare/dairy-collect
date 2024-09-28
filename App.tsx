
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./Src/Constant/Routes";
import SignupScreen from "./Src/Screen/PublicScreen/SignupScreen";
import LoginScreen from "./Src/Screen/PublicScreen/LoginScreen";
import PrivateNavigation from "./Src/Screen/PrivateNavigation";
const Stack = createNativeStackNavigator();
export default function AnimatedStyleUpdateExample(props:any) {
 return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown:false}}>
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen}/>
          <Stack.Screen name={Routes.SIGNUP} component={SignupScreen} />
        </Stack.Group>
        <Stack.Screen name={Routes.PRIVATE} component={PrivateNavigation}/>
      
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
