import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./Src/navigation/AppNavigator";


export default function AnimatedStyleUpdateExample(props:any) {
 return (
  <SafeAreaProvider>
    <AppNavigator />
   </SafeAreaProvider>
  );
}
