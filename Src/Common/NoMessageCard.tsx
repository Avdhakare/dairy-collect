import { View,Text } from "react-native";

const NoMessageCard=({title}:{title?:string})=>(
    <View className="h-20 flex-col justify-center m-5 shadow-lg rounded-lg bg-white">
    <Text className="text-center text-lg text-slate-400 ">{ title ?title:'No Record Available'}</Text>
</View>)
export default NoMessageCard;