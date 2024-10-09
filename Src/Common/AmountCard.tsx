import {Text, View } from "react-native"
import { slipData } from "../Constant";
import SlipContainer from "./SlipContainer";
const  AmountCard=({item,getDate,setIsSlip}:any)=>(
    <View className="bg-white shadow-md p-2 rounded-lg border border-green-400 m-2 h-[200]">
        <Text className="text-blue-500 font-bold text-base">Date : {getDate(item?.date)}</Text>
        <View className="flex-1 flex-wrap flex-row justify-between px-2">
            {item?.data.length!==0 && item?.data.map((slip:slipData)=>(slip.type==='AM') &&  <SlipContainer key={slip.date} item={slip} setIsSlip={setIsSlip}/>)}
            {item?.data.length!==0 && item?.data.map((slip:slipData)=>(slip.type==='PM') && (<SlipContainer key={slip.date} item={slip} setIsSlip={setIsSlip}/>))}
        </View>
    </View>
)

export default AmountCard;