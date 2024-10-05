
import { observer } from "mobx-react";
import {Text, TouchableOpacity, View } from "react-native"
const  AmountCard=({item,epochToDateString}:any)=>(
    <View className="bg-white shadow-md p-2 rounded-lg border border-green-400 m-2 h-[200]">
        <Text className="text-blue-500 font-bold text-base">Date : {epochToDateString(item?.date)}</Text>
        <View className="flex-1 flex-wrap flex-row justify-between px-2">
            <TouchableOpacity className="w-[40%] bg-cyan-100 p-2 rounded-md shadow-xl my-2">
                <View  className="flex-row  justify-between">
                    <Text className="p-1 text-sm text-left">Time</Text>
                    <Text className="p-1 text-sm text-right uppercase">{item?.data?.[0]?.type}</Text>
                </View>
                <View  className="flex-row  justify-between">
                    <Text className="p-1 text-sm text-left">Quantity</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[0]?.quantity}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="p-1 text-sm text-left">Price</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[0]?.price}</Text>
                </View>
                <View  className="flex-row justify-between">
                    <Text className="p-1 text-sm text-left">Total</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[0]?.totalAmount}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[40%] bg-cyan-100 p-2 rounded-md shadow-xl my-2">
                <View  className="flex-row  justify-between">
                    <Text className="p-1 text-sm text-left">Time</Text>
                    <Text className="p-1 text-sm text-right uppercase">{item?.data?.[1]?.type}</Text>
                </View>
                <View  className="flex-row  justify-between">
                    <Text className="p-1 text-sm text-left">Quantity</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[1]?.quantity}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="p-1 text-sm text-left">Price</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[1]?.price}</Text>
                </View>
                <View  className="flex-row justify-between">
                    <Text className="p-1 text-sm text-left">Total</Text>
                    <Text className="p-1 text-sm text-right">{item?.data?.[1]?.totalAmount}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
)

export default AmountCard;