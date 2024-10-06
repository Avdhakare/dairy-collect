import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "../Constant/Routes";
import LoginScreen from "../Screen/LoginScreen";
import SignupScreen from "../Screen/SignupScreen";
import DashBoardScreen from "../Screen/DashBoardScreen";
import EditMemberScreen from "../Screen/EditMemberScreen";
import EditDetailsScreen from "../Screen/EditDetailsScreen";
import DetailsScreen from "../Screen/DetailsScreen";   
import { observer } from "mobx-react";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import UpdateUserScreen from "../Screen/UpdateUserScreen";
import PriceScreen from "../Screen/PriceScreen";


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
        <Stack.Screen name={Routes.ADD_MEMBER} component={EditMemberScreen}  options={{title:"Add Member"}} />
        <Stack.Screen name={Routes.EDIT_USER} component={UpdateUserScreen}  options={{title:"Update User Details"}} />
        <Stack.Screen name={Routes.ADD_DETAILS} component={EditDetailsScreen}  options={{title:"Add Information"}} />
        <Stack.Screen name={Routes.PRICE} component={PriceScreen}  options={{title:"Update Price"}} />
      </Stack.Group>
      <Stack.Screen name={Routes.DASHBOARD} component={DashBoardScreen} options={{ title:'',headerLeft:()=>''}}/>
      <Stack.Screen name={Routes.USER_DETAILS} component={DetailsScreen} options={{title:''}} />
    </Stack.Navigator>
</NavigationContainer>
)

}
export default observer(AppNavigator);