import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity,Image} from "react-native";
import { Routes } from "../Constant/Routes";
import {AntDesign,FontAwesome} from '@expo/vector-icons';
import { profile, SCREEN, user } from "../Constant";
import CameraOpen from "../Common/CameraOpen";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useGlobalStore } from "../Hooks/useGlobalStore";
const AddUserScreen=({navigation,route}:SCREEN)=>{
    const [data,setData]=useState<profile>({} as profile )
    const [cameraVisible, setCameraVisible] = useState(false);
    const store=useGlobalStore()
    const handleSubmit = async () => {
        data.endDate = new Date().getTime();
        data.startDate = new Date().getTime();
        data.image= data.image?data.image :'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        data.totalAmount= 10;
        data.dueAmount=0;
        if(data?.name && data?.mobileNumber){
          store.userStore.addMember(data)
          setData({} as profile)
          navigation.goBack()
        } 
       
    };
    return (
      <View>
        {cameraVisible ? (
          <CameraOpen setCameraVisible={setCameraVisible} setPicture={(e: any)=>setData({...data,image:e})}/>
        ) :(
          <View className="bg-cyan-50 rounded-md py-4">
            <View className=" h-full flex-col justify-between">
              <View className=" py-2 px-3 h-[335]">
                <View className="border-2 border-green-300 w-[300] h-[300] relative flex flex-row mx-auto items-center rounded-full">
                  {data.image ? (
                    <Image source={{ uri: data.image }} className=' w-full h-full rounded-full' />
                  ) : (
                    <Image
                      source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                      className=' w-full h-full'
                    />
                  )}
                  <TouchableOpacity onPress={() => setCameraVisible(true)} className=" p-2 absolute left-[55%] top-[75%]" style={{transform:[{ translateX: -50 }]}} >
                    <FontAwesome name="plus-circle" size={60} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="mt-4 text-green-800 text-base text-center font-bold">Name</Text>
                <Input
                  placeholder="Please Enter Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e })}
                />
                <Text className=" text-green-800 mt-4 text-center text-base font-bold">Mobile Number</Text>
                <Input
                  placeholder="Please Enter Mobile Number"
                  value={data.mobileNumber}
                  type="phone-pad"
                  maxLength={10}
                  onChange={(e) => setData({ ...data, mobileNumber: e })}
                />
              </View>
              <View className="pb-3 " >
              <Button onPress={handleSubmit}/>
              </View>
            </View>
          </View>
        )}
      </View>
    )
}
export default AddUserScreen;