
import {View,Text,Image, TouchableOpacity } from "react-native";
import React from "react";
import DatePicker from "./DatePicker";
import {AntDesign} from '@expo/vector-icons';

const DetailCard=({item,dateSelect,setDateSelect,onPayment,isDate=false,getDate,isDateReadView=false}:any)=>{
    const totalAmount=(Number(item?.totalAmount?item?.totalAmount:0)+Number(item?.recieved?item?.recieved:0));
    const DueAmount=totalAmount &&item.send? totalAmount-item.send:!totalAmount &&item?.send?item?.send:!item?.send && totalAmount? totalAmount:0
    return(
        <View  className="pt-2">
            <View className="bg-white p-4 rounded-2xl shadow-md my-2 relative">
                <View className="flex-row items-center">
                    {item?.image ?(<Image source={{ uri: item.image }} className='w-20 h-20 rounded-full mr-4' />
                    ):(<Image source={ require("../../assets/images/profile.png")} className="w-20 h-20 rounded-full mr-4" />)}
                    <View className="flex-1 relative">
                        <Text className="text-green-600 text-lg font-bold capitalize ">{item?.name}</Text>
                        <Text className="text-sm font-bold mt-1">{item?.mobileNumber}</Text>
                        <Text className="text-sm font-bold mt-1">{item.send?item.send?.toFixed(2):'0.00'}</Text>

                    </View>
                </View>
                <View className="fle-1 flex-row justify-between items-center mt-2 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Due Amount</Text>
                        <Text className={`text-left text-sm mt-1 ${DueAmount && DueAmount>=0?'text-gray-500':'text-red-600'} `}>{DueAmount?.toFixed(2)}</Text>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >Total Amounnt</Text>
                        <Text className="text-gray-500 text-sm mt-1 text-right">{totalAmount?.toFixed(2)}</Text>
                    </View>
                </View>
                {isDate &&<View className="fle-1 flex-row justify-between items-center mt-1 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Start Date</Text>
                        <DatePicker item={dateSelect.createTimestamp} getDateformPicker={(date)=>setDateSelect({...dateSelect,createTimestamp:date})}/>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >End Date</Text>
                        <DatePicker item={dateSelect.updateTimestamp} getDateformPicker={(date)=>setDateSelect({...dateSelect,updateTimestamp:date})}/>
                    </View>
                </View>}
               {isDateReadView &&<View className="fle-1 flex-row justify-between items-center mt-2 ">
                    <View className="">
                        <Text className="text-blue-500 text-left text-base font-bold">Start Date</Text>
                        <Text className="text-gray-500 text-left text-sm mt-1">{getDate(item.createTimestamp)}</Text>
                    </View>
                    <View>
                        <Text className="text-blue-500 text-base font-bold text-right" >End Date</Text>
                        <Text className="text-gray-500 text-sm mt-1 text-right">{getDate(item.updateTimestamp)}</Text>
                    </View>
                </View>}
               {onPayment && <TouchableOpacity onPress={onPayment} className=" absolute p-3  right-4">
                    <AntDesign name="wallet" size={30} color="green" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}
export default DetailCard;