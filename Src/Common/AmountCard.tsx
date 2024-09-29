
import React, { useState } from "react"
import { ScrollView,Text, TouchableOpacity, View } from "react-native"
import { detailTable } from "../Constant"



const  AmountCard=({setHideProfile}:any)=>{
    return(
        <View className="bg-white shadow-md p-2 rounded-lg border border-green-400 m-2">
            <Text className="text-blue-500 font-bold text-base">Date : 20/05/2000</Text>
            <View className="flex-1 flex-wrap flex-row justify-between px-2">
                <TouchableOpacity className="w-[40%] bg-cyan-100 p-2 rounded-md shadow-xl my-2">
                    <View  className="flex-row  justify-between">
                        <Text className="p-1 text-sm text-left">Quantity</Text>
                        <Text className="p-1 text-sm text-right"> 20</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="p-1 text-sm text-left">Rate</Text>
                        <Text className="p-1 text-sm text-right">5</Text>
                    </View>
                    <View  className="flex-row justify-between">
                        <Text className="p-1 text-sm text-left">Total</Text>
                        <Text className="p-1 text-sm text-right">100</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="w-[40%] bg-cyan-100 p-2 rounded-md shadow-xl my-2">
                    <View  className="flex-row  justify-between">
                        <Text className="p-1 text-sm text-left">Quantity</Text>
                        <Text className="p-1 text-sm text-right"> 20</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="p-1 text-sm text-left">Rate</Text>
                        <Text className="p-1 text-sm text-right">5</Text>
                    </View>
                    <View  className="flex-row justify-between">
                        <Text className="p-1 text-sm text-left">Total</Text>
                        <Text className="p-1 text-sm text-right">100</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
} 

export default AmountCard;