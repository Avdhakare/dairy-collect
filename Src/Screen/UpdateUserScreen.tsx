import React, {useState } from "react";
import { View,Text, TouchableOpacity,Image, ScrollView} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { ADMIN, SCREEN} from "../Constant";
import CameraOpen from "../Common/CameraOpen";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useGlobalStore } from "../Hooks/useGlobalStore";

const UpdateUserScreen=({navigation}:SCREEN)=>{
    const store=useGlobalStore()
    const [data,setData]=useState<ADMIN>(store.authenticationStore.admin)
    const [cameraVisible, setCameraVisible] = useState(false);
    const handleSubmit = async () => {
        if(data?.name && data?.mobileNumber){
          const check= store.authenticationStore.updateProfile(data)
          if(check) navigation.goBack()
          setData({} as ADMIN)
        } 
       
    };
    return (
      <View>
        {cameraVisible ? (
          <CameraOpen setCameraVisible={setCameraVisible} setPicture={(e: any)=>setData({...data,image:e})}/>
        ) :(
          <ScrollView className="bg-cyan-50 rounded-md">
              <View className=" mt-10 py-2 px-3">
                <View className="border-2 border-green-300 w-[250] h-[250] relative flex flex-row mx-auto items-center rounded-full">
                  {data.image ? (
                    <Image source={{ uri: data.image }} className=' w-full h-full rounded-full' />
                  ) : (
                    <Image
                      source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                      className=' w-full h-full'
                    />
                  )}
                  <TouchableOpacity onPress={() => setCameraVisible(true)} className=" p-2 absolute left-[55%] top-[70%]" style={{transform:[{ translateX: -50 }]}} >
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
                    readOnly={true}
                    onChange={(e) =>{
                        const numericValue = e.replace(/[^0-9]/g, '')
                        setData({ ...data, mobileNumber: numericValue })
                    }}
                />
                <Text className=" text-green-800 mt-4 text-center text-base font-bold">Email Address</Text>
                <Input
                    placeholder="Please Enter Email Address"
                    value={data.email}
                    type="email-address"
                    onChange={(e) => setData({ ...data, email: e })}
                />
                 <Text className=" text-green-800 mt-4 text-center text-base font-bold">Address</Text>
                <Input
                    placeholder="Please Enter Address"
                    value={data.address}
                    type="default"
                    onChange={(e) => setData({ ...data, address: e })}
                />
                 <Text className=" text-green-800 mt-4 text-center text-base font-bold">City</Text>
                <Input
                    placeholder="Please Enter City"
                    value={data.city}
                    type="default"
                    onChange={(e) => setData({ ...data, city: e })}
                />
                 <Text className=" text-green-800 mt-4 text-center text-base font-bold">Pin Code</Text>

                <Input
                    placeholder="Please Enter Pin Code"
                    value={data.pinCode}
                    type="number-pad"
                    maxLength={6}
                    onChange={(e) =>{
                        const numericValue = e.replace(/[^0-9]/g, '')
                        setData({ ...data,pinCode: numericValue })
                    }}
                />
              </View>
              <View className="py-5 mb-10" >
                <Button onPress={handleSubmit}/>
              </View>
          </ScrollView>
        )}
      </View>
    )
}
export default UpdateUserScreen;