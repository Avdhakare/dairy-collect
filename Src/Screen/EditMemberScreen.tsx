import React, {useState } from "react";
import { View,Text, TouchableOpacity,Image, ScrollView} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { PROFILE, SCREEN} from "../Constant";
import CameraOpen from "../Common/CameraOpen";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useGlobalStore } from "../Hooks/useGlobalStore";
const EditMemberScreen=({navigation,route}:SCREEN)=>{
    const [data,setData]=useState<PROFILE>({} as PROFILE )
    const [cameraVisible, setCameraVisible] = useState(false);
    const store=useGlobalStore()
    const handleSubmit = async () => {
        data.updateTimestamp = new Date().getTime();
        data.createTimestamp = new Date().getTime();
        data.image= data.image?data.image :'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        data.totalAmount= 0;
        data.dueAmount=0;
        data.adminID=store.authenticationStore.admin.id
        if(data?.name && data?.mobileNumber){
          store.memberStore.addMember(data)
          setData({} as PROFILE)
          navigation.goBack()
        } 
       
    };
    return (
      <View>
        {cameraVisible ? (
          <CameraOpen setCameraVisible={setCameraVisible} setPicture={(e: any)=>setData({...data,image:e})}/>
        ) :(
          <ScrollView className="bg-cyan-50 h-full rounded-md py-4">
            <View className=" h-full flex-col  justify-between">
              <View className=" py-2 px-3 ">
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
                    <MaterialCommunityIcons name="camera-enhance-outline" size={60} color="white" />
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
                  onChange={(e) =>{ 
                    const numericValue = e.replace(/[^0-9]/g, '')
                    setData({ ...data, mobileNumber: numericValue})
                  }}
                />
              </View>
              <View className="py-5 " >
              <Button onPress={handleSubmit}/>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    )
}
export default EditMemberScreen;