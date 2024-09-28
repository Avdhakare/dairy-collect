import {
    View,
    Button,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
  } from "react-native";
  import { Routes } from "../../Src/Constant/Routes";
  // import { ScrollView } from "react-native-reanimated";
  const SignupScreen = ({navigation}:any) => {
    return (
      <ScrollView>
      <View className="bg-white h-[820] w-full">
        <Image className="h-full w-full absolute" source={require("../../assets/images/background.png")}  />
        <View className="flex-row justify-around w-full absolute">
          <Image className="h-[225] w-[90]" source={require("../../assets/images/light.png")} />
          <Image className="h-[160] w-[65]" source={require("../../assets/images/light.png")} />
        </View>
        <View className="h-full w-full flex justify-around pt-60 pb-10">
          <View className="flex items-center">
            <Text className="text-white font-bold tracking-wider text-5xl"> Sign UP</Text>
          </View>
          <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
              <TextInput placeholder="username" placeholderTextColor={"gray"} />
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full">
              <TextInput placeholder="Email" placeholderTextColor={"gray"} />
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
              <TextInput
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
              />
            </View>
            <View className="w-full">
              <TouchableOpacity onPress={()=>navigation.navigate(Routes.PRIVATE)} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                <Text className="text-xl font-bold text-white text-center">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Text>You have an account? </Text>
              <TouchableOpacity onPress={()=>navigation.navigate(Routes.LOGIN)} >
                <Text className="text-sky-600">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  };
  export default SignupScreen;
  