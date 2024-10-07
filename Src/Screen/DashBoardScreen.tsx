import {TouchableOpacity, View,FlatList, BackHandler,Text } from "react-native"
import {AntDesign,FontAwesome,FontAwesome5} from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from "react";
import { PROFILE, SCREEN} from "../Constant";
import { Routes } from "../Constant/Routes";
import UserCard from "../Common/UserCard";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ProfileModal from "../Common/ProfileModal";
import NoMessageCard from "../Common/NoMessageCard";

const DashBoardScreen=({navigation}:SCREEN)=>{
    const store= useGlobalStore();
    const [isProfile,setIsProfile]=useState(false)
    const isFocus=useIsFocused();
    const[entries,setEntries]=useState<PROFILE[]>([] as PROFILE[])
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (<View className="flex-row justify-between">
                <TouchableOpacity className="px-3 py-3" onPress={()=>setIsProfile(!isProfile)}>
                    {isProfile?(<FontAwesome name="user-circle" size={29} color="green" />):(<FontAwesome5 name="user-circle" size={30} color="green" />)}
                </TouchableOpacity> 
            </View>),
        })
        setEntries(()=>store.memberStore.members.filter((member:PROFILE)=>(member?.adminID===store.authenticationStore.admin?.id)))

    },[isProfile,store.memberStore.members,isFocus])
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
            <ProfileModal setIsProfile={setIsProfile} isProfile={isProfile} navigation={navigation}/>
            <FlatList<any>
                data={entries}
                renderItem={(item)=>(
                    <UserCard 
                        key={item.index}
                        disabled={!store.authenticationStore.admin.price}
                        {...item} 
                        ContainerClick={(item:PROFILE)=>{
                            store.memberStore.setMember(item.id,item.adminID)
                            navigation.navigate(Routes.USER_DETAILS)
                        }} 
                        onPress={(item:PROFILE)=>navigation.navigate(Routes.ADD_DETAILS,{id:item.id})} 
                    />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<NoMessageCard title='No Member Available'/>}
            />  
        </View>      
    )
}
export default DashBoardScreen;