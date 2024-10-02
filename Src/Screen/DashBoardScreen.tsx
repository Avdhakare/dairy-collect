import {TouchableOpacity, View,FlatList, BackHandler } from "react-native"
import {AntDesign,FontAwesome,FontAwesome5} from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from "react";
import { profile, SCREEN} from "../Constant";
import { Routes } from "../Constant/Routes";
import UserCard from "../Common/UserCard";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ProfileModal from "../Common/ProfileModal";

const DashBoardScreen=({navigation}:SCREEN)=>{
    const store= useGlobalStore();
    const [isProfile,setIsProfile]=useState(false)
    const isFocus=useIsFocused();
    const[entries,setEntries]=useState<profile[]>([] as profile[])
    useEffect(()=>{
        setEntries(store.userStore.users)
    },[store.userStore.users,isFocus])
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (<View className="flex-row justify-between">
                <TouchableOpacity className="px-3 py-3" onPress={()=> navigation.navigate(Routes.ADD_USER_MODAL)}>
                    <FontAwesome name="rupee" size={30} color="green" />
                </TouchableOpacity>
                <TouchableOpacity className="px-3 py-3" onPress={()=>setIsProfile(!isProfile)
                    // navigation.navigate(Routes.ADD_USER_MODAL)
                }>
                    {/* <AntDesign name="adduser" size={30} color="green"/> */}
                    {isProfile?(<FontAwesome name="user-circle" size={29} color="green" />):(<FontAwesome5 name="user-circle" size={30} color="green" />)}
                </TouchableOpacity> 
            </View>),
            title:'',
            headerLeft:()=>null,
         })

    },[navigation,isProfile])
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
        <View>
            <ProfileModal setIsProfile={setIsProfile} isProfile={isProfile} />
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