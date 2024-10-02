import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "../Constant/Routes";
import LoginScreen from "../Screen/LoginScreen";
import SignupScreen from "../Screen/SignupScreen";
import DashBoardScreen from "../Screen/DashBoardScreen";
import AddUserScreen from "../Screen/AddUserScreen";
import AddDetailsScreen from "../Screen/AddDetailsScreen";
import DetailsScreen from "../Screen/DetailsScreen";   
import { observer } from "mobx-react";
import { useGlobalStore } from "../Hooks/useGlobalStore";


const AppNavigator=()=>{
  const store= useGlobalStore();
  const Stack = createNativeStackNavigator<any>();
return(
  <NavigationContainer >
    <Stack.Navigator 
      initialRouteName={store.authenticationStore.signIN ?Routes.DASHBOARD :Routes.LOGIN}
      screenOptions={{
        headerStyle: { backgroundColor: "#CAF4FF" }, 
        headerTitleStyle: {fontSize:22},
        headerTitleAlign:"center",
        headerTintColor: "green",
      }}
    >
      <Stack.Group  screenOptions={{ headerShown:false}}>
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen}/>
        <Stack.Screen name={Routes.SIGNUP} component={SignupScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation:"modal"}}>
        <Stack.Screen name={Routes.ADD_USER_MODAL} component={AddUserScreen}  options={{title:"Add User"}} />
        <Stack.Screen name={Routes.ADD_DETAILS_MODAL} component={AddDetailsScreen}  options={{title:"Add Information"}} />
      </Stack.Group>
      <Stack.Screen name={Routes.DASHBOARD} component={DashBoardScreen}/>
      <Stack.Screen name={Routes.USER_DETAILS} component={DetailsScreen} options={{title:"User Details"}} />
    </Stack.Navigator>
</NavigationContainer>
)

}
export default observer(AppNavigator);