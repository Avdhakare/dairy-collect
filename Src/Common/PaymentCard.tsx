import React from "react"
import { View,Text,Image } from "react-native"
import{MaterialIcons} from '@expo/vector-icons';

const PaymentCard=()=>(
    <View className="bg-white p-4 rounded-lg shadow-md flex-row items-center space-x-4 m-2">
        <Image source={ require("../../assets/images/profile.png")} className="w-20 h-20 rounded-full mr-4" />
        <View className="flex-1">
            <Text className="text-xl font-semibold text-green-600">Avdhesh Dhakare</Text>
            <Text className="text-sm  font-semibold">CREDITED</Text>
        </View>
        <View className="text-right">
            <View className="flex-row items-center">
                <MaterialIcons name="currency-rupee" size={18} color="green" style={{padding:0, margin:0}} />
                <Text  className="text-xl pl-1 font-semibold">15,00 </Text> 
            </View>
            <Text className="text-gray-500">16 May 2024</Text>
        </View>
    </View>
)
export default PaymentCard;