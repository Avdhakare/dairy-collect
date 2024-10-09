import { useEffect, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import { View,TouchableOpacity, FlatList,Text } from "react-native";
import { Routes } from "../Constant/Routes";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import AmountCard from "../Common/AmountCard";
import {dateFormet, PROFILE, SCREEN, slipData } from "../Constant";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import { observer } from "mobx-react";
import { useIsFocused } from "@react-navigation/native";
import DairySlip from "../Common/DairySlip";
import Modal from "react-native-modal";
import NoMessageCard from "../Common/NoMessageCard";
import PopOver from "../Common/PopOver";

const DetailsScreen=({navigation,route}:SCREEN)=>{
    const store=useGlobalStore();
    const [isSlip,setIsSlip]=useState<slipData|null>(null)
    const [dateSelect ,setDateSelect]=useState<dateFormet>({}as dateFormet)
    const [showDetailCard, setShowDetailCard] = useState(true);
    const [details,setDetails]=useState<PROFILE>({} as PROFILE)
    const [status,setStatus]=useState<boolean>(false)
    const isFocus=useIsFocused();
    useEffect(()=>{
        navigation.setOptions({  
            title:store.memberStore?.member?.name ,
            headerRight: () => (
                <View className="flex-row justify-end items-center">
                    <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_DETAILS,{id:store.memberStore?.member?.id})} className="p-3">
                        <AntDesign name="pluscircleo" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate(Routes.SLIP_VIEW_CONTAINER,{id:store.memberStore?.member?.id})} className="p-3">
                        <AntDesign name="printer" size={30} color="green" />
                    </TouchableOpacity>
                </View>
            )
        })
        DataFilterBaseOnDate({
            createTimestamp: store.memberStore?.member?.createTimestamp?store.memberStore?.member?.createTimestamp:new Date().getTime(),
            updateTimestamp: store.memberStore?.member?.updateTimestamp?store.memberStore?.member?.updateTimestamp:new Date().getTime()     
        })
    },[store.memberStore.members,isFocus])
    const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        if (scrollOffsetY > 50) setShowDetailCard(false);
        else setShowDetailCard(true); 
    };
    const DataFilterBaseOnDate=(date:{createTimestamp:EpochTimeStamp,updateTimestamp:EpochTimeStamp})=>{
        const data:PROFILE=JSON.parse(JSON.stringify(store.memberStore.member));
        data.details=store.memberStore.member.details.filter((item:any)=>(item.date>=date.createTimestamp && item.date<=date.updateTimestamp))
        setDetails(data)
        setStatus(!status)
        setDateSelect(date)
    }
    return( 

        <FlatList
            data={details.details}
            renderItem={({item})=>(<AmountCard item={item} epochToDateString={store.memberStore.epochToDateString} setIsSlip={setIsSlip}/>)}
            scrollEnabled={true}
            stickyHeaderIndices={[0]}
            onScroll={handleScroll} 
            scrollEventThrottle={16} 
            ListHeaderComponent={
                <View className="bg-gray-50 shadow-lg mx-2">
                    <PopOver isVisible={isSlip!==null? true:false} setIsVisible={()=>setIsSlip(null)}>
                        <DairySlip isSlip={isSlip} adminName={store.authenticationStore.admin.name} member={store.memberStore.member} getDate={store.memberStore.epochToDateString} />
                    </PopOver>
                    {showDetailCard &&(<DetailCard item={details} dateSelect={dateSelect}setDateSelect={DataFilterBaseOnDate} onPayment={()=>navigation.navigate(Routes.PAYMENT)} isDate={true}/>)}
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={DataFilterBaseOnDate}/>
                </View>
            }
            ListEmptyComponent={<NoMessageCard />} 
        />
    )
}
export default observer(DetailsScreen);