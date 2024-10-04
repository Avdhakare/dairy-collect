import { useEffect, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import { View,TouchableOpacity, FlatList,Text } from "react-native";
import { Routes } from "../Constant/Routes";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import AmountCard from "../Common/AmountCard";
import { PROFILE, SCREEN } from "../Constant";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { observer } from "mobx-react";
import { useIsFocused } from "@react-navigation/native";

const DetailsScreen=({navigation,route}:SCREEN)=>{
    const store=useGlobalStore();
    const [dateSelect ,setDateSelect]=useState({startDate:new Date().getTime(),endDate:new Date().getTime()})
    const [showDetailCard, setShowDetailCard] = useState(true);
    const [details,setDetails]=useState<PROFILE>({} as PROFILE)
    const isFocus=useIsFocused();
    useEffect(()=>{
        const data:any=store.memberStore.member.find((item:PROFILE)=>(item.id===route.params.id && item.adminID===route.params.adminID))
        setDetails({...data})
    },[route.params,store.memberStore.member,isFocus])
    useEffect(()=>{
     navigation.setOptions({  
        title:details?.name ,
        headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_DETAILS,{id:details.id,adminID:route.params?.adminID})}>
               <AntDesign name="pluscircleo" size={25} color="green" />
            </TouchableOpacity>
        )
    })
    setDateSelect({
        startDate: details?.createTimestamp?details?.createTimestamp:new Date().getTime(),
        endDate: details?.updateTimestamp?details?.updateTimestamp:new Date().getTime()
     })
},[details,navigation])
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    if (scrollOffsetY > 50) setShowDetailCard(false);
    else setShowDetailCard(true); 
  };
    return( 

        <FlatList
            data={details?.details}
            renderItem={({item})=>(<AmountCard item={item}/>)}
            scrollEnabled={true}
            stickyHeaderIndices={[0]}
            onScroll={handleScroll} 
            scrollEventThrottle={16} 
            ListHeaderComponent={
                <View className="bg-gray-50 shadow-lg mx-2">
                    <DetailCard item={details} dateSelect={dateSelect}setDateSelect={setDateSelect}/>
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={setDateSelect}/>
                </View>
            }
            ListEmptyComponent={
                <View className="h-20 flex-col justify-center m-5 shadow-lg rounded-lg bg-white">
                    <Text className="text-center text-lg text-slate-400 ">No Record Available</Text>
                </View>
            }
            
        />
    )
}
export default observer(DetailsScreen);