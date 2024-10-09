import React, { useEffect, useState } from "react";
import { View,FlatList, TouchableOpacity} from "react-native"
import {AntDesign} from '@expo/vector-icons';

import { dateFormet, PAYMENT, PROFILE, SCREEN } from "../Constant";
import { useGlobalStore } from "../Hooks/useGlobalStore";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import PaymentCard from "../Common/PaymentCard";
import NoMessageCard from "../Common/NoMessageCard";
import AddPayment from "../Common/AddPayment";

const PaymentScreen=({navigation}:SCREEN)=>{
    const store=useGlobalStore();
    const [details,setDetails]=useState<PROFILE>({} as PROFILE)
    const [paymentModal, setPaymentModal] = useState(false);
    const [dateSelect ,setDateSelect]=useState<dateFormet>({}as dateFormet)
    useEffect(()=>{
        navigation.setOptions({
            title:store.memberStore?.member?.name,
            headerRight: () => (
                <View className="flex-row justify-end items-center">
                    <TouchableOpacity onPress={()=>setPaymentModal(!paymentModal)} className="p-3">
                        <AntDesign name="pluscircleo" size={30} color="green" />
                    </TouchableOpacity>
                </View>
            )
        })
        DataFilterBaseOnDate({
            createTimestamp: store.memberStore?.member?.createTimestamp?store.memberStore?.member?.createTimestamp:new Date().getTime(),
            updateTimestamp: store.memberStore?.member?.updateTimestamp?store.memberStore?.member?.updateTimestamp:new Date().getTime()     
        })
    },[store.memberStore.members])
    const DataFilterBaseOnDate=(date:{createTimestamp:EpochTimeStamp,updateTimestamp:EpochTimeStamp})=>{
        const data:PROFILE=JSON.parse(JSON.stringify(store.memberStore.member));
        data.payment=store.memberStore.member.payment.filter((item:any)=>(item.date>=date.createTimestamp && item.date<=date.updateTimestamp))
        setDetails(data)
        setDateSelect(date)
    }
    console.log(details.payment)
    return(
        <FlatList
            data={details?.payment?.length!==0?details.payment:store.memberStore.member?.payment}
            renderItem={({item})=>( <PaymentCard details={details} item={item} getDate={store.memberStore.epochToDateString}/>)}
            scrollEnabled={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <View className='bg-gray-50 shadow-lg mx-2'>
                    <DetailCard item={details} dateSelect={dateSelect}setDateSelect={DataFilterBaseOnDate}/>
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={DataFilterBaseOnDate}/>
                    <AddPayment isPayemnt={paymentModal} setIsPayemnt={setPaymentModal}/>
                </View>
            }
            ListEmptyComponent={<NoMessageCard title='No Payment Available'/>}
        />
    )
}
export default PaymentScreen;