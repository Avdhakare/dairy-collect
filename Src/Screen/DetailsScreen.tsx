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
import DairySlipModel from "../Common/DairySlipModel";
import Modal from "react-native-modal";

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
                <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_DETAILS,{id:store.memberStore?.member?.id})}>
                <AntDesign name="pluscircleo" size={25} color="green" />
                </TouchableOpacity>
            )
        })
        DataFilterBaseOnDate({
            createTimestamp: store.memberStore?.member?.createTimestamp?store.memberStore?.member?.createTimestamp:new Date().getTime(),
            updateTimestamp: store.memberStore?.member?.updateTimestamp?store.memberStore?.member?.updateTimestamp:new Date().getTime()     
        })
    },[route.params,store.memberStore.members,isFocus])
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
   console.log("Avdhhesh",isSlip)
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
                    <Modal isVisible={isSlip!==null? true:false} onBackdropPress={()=>setIsSlip(null)}>
                        <DairySlipModel isSlip={isSlip} adminName={store.authenticationStore.admin.name} member={store.memberStore.member} getDate={store.memberStore.epochToDateString} />
                    </Modal>
                    {showDetailCard &&(<DetailCard item={details} dateSelect={dateSelect}setDateSelect={DataFilterBaseOnDate}/>)}
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={DataFilterBaseOnDate}/>
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