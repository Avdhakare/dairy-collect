import { View,Text, Alert } from "react-native";
import PopOver from "./PopOver";
import DatePicker from "./DatePicker";
import DropDown from "./DropDown";
import { useState } from "react";
import { PAYMENT, PAYMENTTYPE } from "../Constant";
import Input from "./Input";
import Button from "./Button";
import { useGlobalStore } from "../Hooks/useGlobalStore";
const AddPayment=({isPayemnt,setIsPayemnt}:any)=>{
    const [data, setData] = useState<PAYMENT>({type:PAYMENTTYPE.DEBIT,date:new Date().getTime(),amount:0});
    const store=useGlobalStore()
    const updateData=(key:string,value:any)=>{
        setData({...data,[key]:value})
    }
    const onSubmit=(data:PAYMENT)=>{
        Alert.alert(
            "Payment Alert",       // Title of the alert
            "If You are save this payment then you are not authorised to delete",  // Message of the alert
            [{ text: "Cancel", onPress: () =>{}},
              { text: "OK", onPress: () => {
                store.memberStore.setPayment(data)
                setIsPayemnt(!isPayemnt)
                setData({type:PAYMENTTYPE.DEBIT,date:new Date().getTime(),amount:0});
              } }
            ]
        );
    }
    return(
        <PopOver isVisible={isPayemnt} setIsVisible={setIsPayemnt}>
            <View className="w-[350] p-3">
                <Text className="text-lg text-center text-green-600 font-semibold ">Add Payment</Text>
                <View className="pt-3" >
                    <View className="w-full my-3">
                        <Text className="text-lg pb-1 pl-2">Date</Text>
                        <DatePicker item={data.date} getDateformPicker={(date)=>updateData('date',date)}/>
                    </View>
                    <View className="w-full my-3">
                        <Text className="text-lg pb-1 pl-2">Time</Text>
                        <DropDown
                            value={data.type}
                            onChange={(itemValue, itemIndex) =>updateData('type',itemValue)}
                            options={[PAYMENTTYPE.CREDIT,PAYMENTTYPE.DEBIT]}
                        />
                    </View>
                    <View className="w-full my-3">
                        <Text className="text-lg pl-2">Payment Amount</Text>
                        <Input 
                            onChange={(e) =>updateData('amount',Number(e))}
                            value={ String(data.amount?data.amount:0)}
                            placeholder="FAT"
                            type="phone-pad"
                        />
                    </View>
                    <View className="flex-row pt-3 justify-center">
                        <Button disabled={data.amount<=0}  onPress={()=>onSubmit(data)}/>
                    </View>

                </View>
            </View>
        </PopOver>
    )
}   
export default AddPayment;