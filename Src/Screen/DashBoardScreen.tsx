import {TouchableOpacity, View,FlatList, BackHandler,Text } from "react-native"
import {AntDesign,FontAwesome,FontAwesome5} from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from "react";
import { PROFILE, SCREEN} from "../Constant";
import { Routes } from "../Constant/Routes";
import UserCard from "../Common/UserCard";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ProfileModal from "../Common/ProfileModal";

const DashBoardScreen=({navigation}:SCREEN)=>{
    const store= useGlobalStore();
    const [isProfile,setIsProfile]=useState(false)
    const isFocus=useIsFocused();
    const[entries,setEntries]=useState<PROFILE[]>([] as PROFILE[])
    useEffect(()=>{
        setEntries(()=>store.memberStore.member.filter((member:PROFILE)=>(member?.adminID===store.authenticationStore.admin?.id)))
    },[store.memberStore.member,isFocus])
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (<View className="flex-row justify-between">
                <TouchableOpacity className="px-3 py-3" onPress={()=>setIsProfile(!isProfile)}>
                    {isProfile?(<FontAwesome name="user-circle" size={29} color="green" />):(<FontAwesome5 name="user-circle" size={30} color="green" />)}
                </TouchableOpacity> 
            </View>),
         })

    },[navigation,isProfile])
    console.log("store.memberStore.member",store.memberStore.member)
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () =>{
            BackHandler.exitApp();
             return true;
          }
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return(
        <View className="">
            <ProfileModal setIsProfile={setIsProfile} isProfile={isProfile} navigation={navigation}/>
            <FlatList<any>
                data={entries}
                renderItem={(item)=>(
                    <UserCard 
                        key={item.index}
                        {...item} 
                        ContainerClick={(item:PROFILE)=>navigation.navigate(Routes.USER_DETAILS,{id:item.id,adminID:item.adminID})} 
                        onPress={(item:PROFILE)=>navigation.navigate(Routes.ADD_DETAILS,{id:item.id})} 
                    />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View className="h-20 flex-col justify-center m-5 shadow-lg rounded-lg bg-white ">
                        <Text className="text-center text-lg text-slate-400 ">No Member Available</Text>
                    </View>
                }
            />  
        </View>      
    )
}
export default DashBoardScreen;