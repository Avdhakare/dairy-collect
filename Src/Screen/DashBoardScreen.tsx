import { Text, TouchableOpacity, View,Image, FlatList } from "react-native"
import Container from "../Common/Container";
import {AntDesign} from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { profile, slipData, user } from "../Constant";
import UserList from "../Common/UserLIst";
import AddPopup from "../Common/AddPopup";
import DetailModel from "../Common/DetailModel";
import { Routes } from "../Constant/Routes";

const DashBoardScreen=({navigation}:any)=>{
    const[isDetails,setIsDetails]=useState<profile| null>(null)
    console.log(navigation)
    const[entries,setEntries]=useState<profile[]>([
        {
          "dueAmount": 10, 
          "endDate": 1708930893309, 
          "id": "1", 
          "mobileNumber": 8445667407, 
          "name": "Avdhesh Dhakare", 
          "image":`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`, 
          "startDate": 1708930893309, 
          "totalAmount": 10000,
          details:[]
        }
    ])
    
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_USER_MODAL)}>
                     <AntDesign name="adduser" size={30} color="green"/>
                </TouchableOpacity>
            ),
            title:''
         })

    },[navigation])
    return(
       <View>
        <DetailModel isVisible={isDetails!==null?true:false} onClose={()=>setIsDetails(null) } onSubmit={()=>console.log("onsubmit") } actualPrice={{
                SNFRate:20,
                FATRate:20,
                actualRate:20
            }}/>
        <FlatList<profile>
            data={entries}
            renderItem={(item)=>(
                <UserList 
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