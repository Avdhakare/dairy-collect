import { Text, TouchableOpacity, View,Image, FlatList } from "react-native"
import {AntDesign} from '@expo/vector-icons';   
import React, { useEffect, useState } from "react";
import { profile, SCREEN, slipData, user } from "../Constant";
import { Routes } from "../Constant/Routes";
import UserCard from "../Common/UserCard";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { useIsFocused } from "@react-navigation/native";

const DashBoardScreen=({navigation}:SCREEN)=>{
    const store= useGlobalStore();
    const isFocus=useIsFocused();
    const[entries,setEntries]=useState<profile[]>([] as profile[])
    useEffect(()=>{
        setEntries(store.userStore.users)
    },[store.userStore.users,isFocus])
    
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_USER_MODAL)}>
                     <AntDesign name="adduser" size={30} color="green"/>
                </TouchableOpacity>
            ),
            title:'',
            headerLeft:()=>(
                <View>
                    <Text></Text>
                </View>
            )
         })

    },[navigation])
    return(
       <View>
        <FlatList<profile>
            data={entries}
            renderItem={(item,)=>(
                <UserCard 
                    key={item.index}
                    {...item} 
                    ContainerClick={(item:profile)=>navigation.navigate(Routes.USER_DETAILS,{item})} 
                    onPress={(item:profile)=>navigation.navigate(Routes.ADD_DETAILS_MODAL,{item})} 
                />
             )}
            keyExtractor={(item) => item.id}
        />
       </View>
       
        
    )
}
export default DashBoardScreen;