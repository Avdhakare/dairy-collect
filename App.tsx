import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./Src/navigation/AppNavigator";
import { GlobalStore, GlobalStoreProvider } from "./GlobalStore";


export default function AnimatedStyleUpdateExample(props:any) {
 return (
  <SafeAreaProvider>
      <GlobalStoreProvider store={GlobalStore}>
        <AppNavigator />
      </GlobalStoreProvider>
   </SafeAreaProvider>
  );
}
