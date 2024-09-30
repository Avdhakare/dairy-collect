
import {View,Text,Image } from "react-native";
import React from "react";
import DatePicker from "./DatePicker";

const DetailCard=({item,dateSelect,setDateSelect}:any)=>{
    function epochToDateString(epoch:any) {
        const date = new Date(parseInt(epoch));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return(
        <View  className="pt-2">
            <View className="bg-white p-4 rounded-2xl shadow-md my-2">
                <View className="flex-row items-center">
                    <Image
                        source={ require("../../assets/images/profile.png")}        
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <View className="flex-1 relative">
                        <Text className="text-green-600 text-lg font-bold capitalize ">{item?.name}</Text>
                        <Text className="text-sm font-bold mt-1">{item?.mobileNumber}</Text>
                    </View>
                </View>
                <View className="fle-1 flex-row justify-between items-center mt-2 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Due Amount</Text>
                        <Text className="text-gray-500 text-left text-sm mt-1">{item.dueAmount}</Text>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >Total Amounnt</Text>
                        <Text className="text-gray-500 text-sm mt-1 text-right">{item?.totalAmount}</Text>
                    </View>
                </View>
                <View className="fle-1 flex-row justify-between items-center mt-1 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Start Date</Text>
                        <DatePicker item={dateSelect.startDate} getDateformPicker={(date)=>setDateSelect({...dateSelect,startDate:date})}/>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >End Date</Text>
                        <DatePicker item={dateSelect.endDate} getDateformPicker={(date)=>setDateSelect({...dateSelect,endDate:date})}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DetailCard;