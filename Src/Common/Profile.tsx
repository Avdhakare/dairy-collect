import Modal  from "react-native-modal";
import{Text, TouchableOpacity, View,Image} from "react-native";
import Button from "./Button";
import {MaterialCommunityIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';

import { useState } from "react";
import CameraOpen from "./CameraOpen";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { Routes } from "../Constant/Routes";
import PopOver from "./PopOver";


const Profile=({setIsProfile,isProfile,navigation}:any)=>{
    const [cameraVisible, setCameraVisible] = useState(false);
    const store=useGlobalStore();
    const{authenticationStore:{
      signIN,admin,updateProfileImage,logout
    }}=store;
    const logoutFunction=()=>{
      logout();
      if(!store.authenticationStore.signIN) navigation.navigate(Routes.LOGIN)
    }
    const navigate=(route:string)=>{
      navigation.navigate(route)
      setIsProfile(false)
    }
    return (
        <PopOver  isVisible={isProfile}  setIsVisible={setIsProfile}>
            {cameraVisible ? (
              <View className="w-screen h-screen">
                <CameraOpen setCameraVisible={setCameraVisible} setPicture={(e: any)=>updateProfileImage('image',e)}/>
              </View>
            ) :(
            <View className="py-1 w-[370]">
                <View className="border-2 border-green-300 w-[150] h-[150] relative flex flex-row mx-auto items-center rounded-full">
                    {admin.image ? (
                      <Image source={{ uri: admin.image }} className=' w-full h-full rounded-full' />
                    ) : (
                      <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        className=' w-full h-full'
                      />
                    )}
                    <TouchableOpacity onPress={() => setCameraVisible(true)} className=" p-2 absolute left-[60%] top-[50%]" style={{transform:[{ translateX: -50 }]}} >
                      <MaterialCommunityIcons name="camera-enhance-outline" size={60} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                  <Text className="text-lg font-bold text-center mt-2 capitalize text-green-600">{admin.name}</Text>
                  <Text className="text-sm  text-center font-bold text-slate-500">{admin.mobileNumber}</Text>
                </View>
                <View  className="border-b border-gray-300 flex flex-col justify-end mt-5 pb-3">
                  <Button onPress={()=>navigate(Routes.EDIT_USER)} classNames="w-[90%] py-3" title="Edit Profile"/>
                </View>
                <View className="p-3">
                  <TouchableOpacity onPress={()=>navigate(Routes.PRICE)} className="py-2 flex-row justify-start items-center">
                    <MaterialIcons name="currency-rupee" size={30} color="green" />
                    <Text className="text-lg text-slate-500 font-bold px-3">Price </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigate(Routes.ADD_MEMBER)} className="py-2 flex-row justify-start items-end">
                    <AntDesign name="adduser" size={30} color="green"/>
                    <Text className="text-lg text-slate-500 font-bold px-3">Add Member </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={logoutFunction} className="py-2 flex-row justify-start items-center">
                    <AntDesign name="logout" size={24} color="green"/>
                    <Text className="text-lg text-slate-500 font-bold px-5">Logout</Text>
                  </TouchableOpacity>
                </View>
            </View>)}
        </PopOver>
    )
}
export default Profile;