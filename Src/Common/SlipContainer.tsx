import { Text, TouchableOpacity, View } from "react-native";

const SlipContainer=({item,setIsSlip}:any)=>(
    <TouchableOpacity onPress={()=>setIsSlip(item)} className="w-[40%] bg-cyan-100 p-2 rounded-md shadow-xl my-2">
        <View  className="flex-row  justify-between">
            <Text className="p-1 text-sm text-left">Time</Text>
            <Text className="p-1 text-sm text-right uppercase">{item?.type}</Text>
        </View>
        <View  className="flex-row  justify-between">
            <Text className="p-1 text-sm text-left">Quantity</Text>
            <Text className="p-1 text-sm text-right">{item?.quantity}</Text>
        </View>
        <View className="flex-row justify-between">
            <Text className="p-1 text-sm text-left">Price</Text>
            <Text className="p-1 text-sm text-right">{item?.price}</Text>
        </View>
        <View  className="flex-row justify-between">
            <Text className="p-1 text-sm text-left">Total</Text>
            <Text className="p-1 text-sm text-right">{item?.totalAmount}</Text>
        </View>
    </TouchableOpacity>
)
export default SlipContainer;