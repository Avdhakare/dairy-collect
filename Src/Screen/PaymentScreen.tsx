import { useEffect, useState } from "react";
import { View,Text,Image, FlatList} from "react-native";
import { dateFormet, PROFILE, SCREEN } from "../Constant";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import PaymentCard from "../Common/PaymentCard";
import NoMessageCard from "../Common/NoMessageCard";

const PaymentScreen=({navigation}:SCREEN)=>{
    const store=useGlobalStore();
    const [details,setDetails]=useState<PROFILE>({} as PROFILE)
    const [dateSelect ,setDateSelect]=useState<dateFormet>({}as dateFormet)
    useEffect(()=>{
        navigation.setOptions({title:store.memberStore?.member?.name})
        DataFilterBaseOnDate({
            createTimestamp: store.memberStore?.member?.createTimestamp?store.memberStore?.member?.createTimestamp:new Date().getTime(),
            updateTimestamp: store.memberStore?.member?.updateTimestamp?store.memberStore?.member?.updateTimestamp:new Date().getTime()     
        })
    },[store.memberStore.members])
    const DataFilterBaseOnDate=(date:{createTimestamp:EpochTimeStamp,updateTimestamp:EpochTimeStamp})=>{
        const data:PROFILE=JSON.parse(JSON.stringify(store.memberStore.member));
        data.details=store.memberStore.member.details.filter((item:any)=>(item.date>=date.createTimestamp && item.date<=date.updateTimestamp))
        setDetails(data)
        setDateSelect(date)
    }
    return(
        <FlatList
            data={[1,2,3,4,5,6,7,8,9,10]}
            renderItem={({item})=>( <PaymentCard/>)}
            scrollEnabled={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <View className='bg-gray-50 shadow-lg mx-2'>
                    <DetailCard item={details} dateSelect={dateSelect}setDateSelect={DataFilterBaseOnDate}/>
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={DataFilterBaseOnDate}/>
                </View>
            }
            ListEmptyComponent={<NoMessageCard title='No Payment Available'/>}
        />
    )
}
export default PaymentScreen;