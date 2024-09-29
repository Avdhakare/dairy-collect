import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity,Image} from "react-native";
import { Routes } from "../Constant/Routes";
import {AntDesign,FontAwesome} from '@expo/vector-icons';
import { user } from "../Constant";
import CameraOpen from "../Common/CameraOpen";
import Input from "../Common/Input";
import Button from "../Common/Button";


const AddUserScreen=({navigation,route}:any)=>{
    const [data,setData]=useState({} as user )
    const [cameraVisible, setCameraVisible] = useState(false);
    const handleSubmit = async () => {
        data.endDate = new Date().getTime();
        data.startDate = new Date().getTime();
        // onSubmit(data);
        // setData({} as user)
        navigation.goBack()
    };
    const userCreate=(data:user) => {
      let arr=[{
        ...data,
        id: 3,
        // entries.length+1,
        image: data.image!==null?data.image :'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        totalAmount: 10000,
        dueAmount:10,
    }]
    if(data?.name){} 
      // setEntries((old: any)=>[...old,...arr])
      // setAddUser(false);
    };

    return (
      <View>
        {cameraVisible ? (
          <CameraOpen setCameraVisible={setCameraVisible} setPicture={(e: any)=>setData({...data,image:e})}/>
        ) :(
          <View className="bg-cyan-50 rounded-md py-4">
            <View className=" h-full flex-col justify-between">
              <View className=" py-2 px-3 h-[335]">
                <View className="border-2 border-green-300 w-[100] h-[100] relative flex flex-row mx-auto items-center rounded-full">
                  {data.image ? (
                    <Image source={{ uri: data.image }} className=' w-24 h-24' />
                  ) : (
                    <Image
                      source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                      className=' w-24 h-24'
                    />
                  )}
                  <TouchableOpacity onPress={() => setCameraVisible(true)} className=" absolute right-0 bottom-0" >
                    <FontAwesome name="plus-circle" size={30} color="black" />
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