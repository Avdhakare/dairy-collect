import React from "react"
import { View,Text,Image } from "react-native"
import{MaterialIcons} from '@expo/vector-icons';
import { PAYMENTTYPE } from "../Constant";

const PaymentCard=({item,getDate}:any)=>(
    <View className="bg-white p-4 rounded-lg shadow-md flex-row items-center space-x-4 m-2">
        <Image source={ require("../../assets/images/profile.png")} className="w-20 h-20 rounded-full mr-4" />
        <View className="flex-1">
            <Text className="text-xl font-semibold text-green-600">Avdhesh Dhakare</Text>
            <Text className="text-sm  text-gray-500">{item?.type===PAYMENTTYPE.CREDIT?`Recieved on ${getDate(item.date,'MONTH')}`:`Sent on ${getDate(item.date,'MONTH')}`}</Text>
        </View>
        <View className="text-right">
            <View className="flex-row items-center">
                <MaterialIcons name="currency-rupee" size={18} color="green" style={{padding:0, margin:0}} />
                <Text  className={`text-xl  font-semibold ${item?.type===PAYMENTTYPE.DEBIT && 'text-red-600'}`}>{item?.amount?.toFixed(2)}</Text> 
            </View>
            <Text className="text-xs text-gray-500 pl-2">{getDate(item.date,'DATE')}</Text>
        </View>
    </View>
)
export default PaymentCard;