import {View,Button,Image,Text,TextInput,TouchableOpacity,ScrollView} from "react-native";
import { Routes } from "../Constant/Routes";
import { ADMIN, SCREEN } from "../Constant";
import Input from "../Common/Input";
import { useState } from "react";
import { useGlobalStore } from "../Hooks/useGlobalStore";
  // import { ScrollView } from "react-native-reanimated";
  const SignupScreen = ({navigation}:SCREEN) => {
    const [data,setData]=useState<any>({name:undefined,mobileNumber:undefined,confirmPassward:undefined,password:undefined})
    const [error,setError]=useState({});
    const store=useGlobalStore();
    const onChange=(key:string,value:string)=>{
      setData({...data,[key]:value})
    }
    const onBlur=(key:string)=>{
      // let errors:any=error
      // if(!data[key]){
      //   errors={...error,[key]:`Please Enter your ${key}`}
      //   return
      // }else{
      //   delete errors[key]
      // }
      // setError(errors)
    }
    const onSubmit=()=>{
      store.authenticationStore.createAdministrator(data)
      if(store.authenticationStore.signIN===true)
        navigation.navigate(Routes.DASHBOARD)
    }
    return (
      // <ScrollView>
      <View className="bg-white h-full  w-full">
        <Image className="h-full w-full absolute" source={require("../../assets/images/background.png")}  />
        <View className="flex-row justify-around w-full absolute">
          <Image className="h-[225] w-[90]" source={require("../../assets/images/light.png")} />
          <Image className="h-[160] w-[65]" source={require("../../assets/images/light.png")} />
        </View>
        <View className="h-full w-full flex justify-around pt-[250] pb-[50]">
          <View className="flex items-center">
            <Text className="text-white font-bold tracking-wider text-5xl"> Sign UP</Text>
          </View>
          <View className="flex items-center mx-4 space-y-4 mt-[100]">
            <View className="bg-black/5 p-5 rounded-2xl w-full">
              <Input 
                placeholder="Full Name" 
                onChange={(value)=>onChange("name",value)} 
                value={data.name}
                onBlur={()=>onBlur("name")}  
              />
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full">
              <Input 
                placeholder="Mobile Number" 
                onChange={(value)=>{
                  const numericValue = value.replace(/[^0-9]/g, '')
                  onChange("mobileNumber",numericValue)
                }}
                maxLength={10}
                value={data.mobileNumber}  
                type="number-pad"
                onBlur={()=>onBlur("mobileNumber")}  
              />
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
              <Input
                placeholder="Password"
                onChange={(value)=>onChange("password",value)}
                value={data.password}
                isSecure={true}   
                onBlur={()=>onBlur("password")}  
              />
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
              <Input
                placeholder="Confirm Password"
                onChange={(value)=>onChange("confirmPassward",value)}
                value={data.confirmPassward}
                isSecure={true}
                onBlur={()=>onBlur("confirmPassward")}  
              />
            </View>
            <View className="w-full">
              <TouchableOpacity onPress={onSubmit} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
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
      // </ScrollView>
    );
  };
  export default SignupScreen;
  