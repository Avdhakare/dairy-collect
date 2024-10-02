import { TouchableOpacity, View,Text,Image } from "react-native";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
const UserCard=({item,ContainerClick,onPress}:any)=>{
    function epochToDateString(epoch:any) {
        const date = new Date(parseInt(epoch));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return(
        <TouchableOpacity onPress={()=>ContainerClick(item)} className="py-2">
            <View className=" bg-white p-4 rounded-2xl shadow-md my-2 mx-4">
                <View className="flex-row items-center">
                    {item?.image ?(<Image source={{ uri: item.image }} className='w-20 h-20 rounded-full mr-4' />
                    ):(<Image source={ require("../../assets/images/profile.png")} className="w-20 h-20 rounded-full mr-4" />)}
                    <View className="flex-1 relative">
                        <Text className="text-green-600 text-lg font-bold capitalize ">{item?.name}</Text>
                        <Text className="text-sm font-bold mt-1">{item?.mobileNumber}</Text>
                        <Text className="text-sm font-bold mt-1 text-indigo-400 ">{item.totalAmount}</Text>

                    </View>
                </View>
                <View className="fle-1 flex-row justify-between items-center mt-2 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Start Date</Text>
                        <Text className="text-gray-500 text-left text-sm mt-1">{epochToDateString(item.startDate)}</Text>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >End Date</Text>
                        <Text className="text-gray-500 text-sm mt-1 text-right">{epochToDateString(item.endDate)}</Text>
                    </View>
                </View> 
               <TouchableOpacity onPress={()=>onPress(item)} className=" absolute top-2 right-3">
                    <AntDesign name={"pluscircleo"} size={24} color="green" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export default UserCard;