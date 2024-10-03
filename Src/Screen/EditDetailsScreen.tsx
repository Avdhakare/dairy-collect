import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { SCREEN, slipData } from "../Constant";
import Button from "../Common/Button";
import Input from "../Common/Input";
import DropDown from "../Common/DropDown";
import DatePicker from "../Common/DatePicker";
import { useGlobalStore } from "../Hooks/useGlobalStore";



const  actualPrice={
    SNFRate:20,
    FATRate:20,
    actualRate:20
}


const EditDetailsScreen=({navigation,route}:SCREEN)=>{
    const [data, setData] = useState<slipData>({}as slipData);
    const [error,setError]=useState<any>({FAT:false,SNF:false,AWM:false,quantity:false})
    const [disabledKey,setDisabledKey]=useState(['FAT',"SNF",'AWM','quantity'])
    const options = ['AM','PM'];
    const store=useGlobalStore();
    useEffect(()=>{
        let date=new Date().getTime()
        let type=new Date().getHours() >= 12 ? 'PM' : 'Am';
        setData({...data,date,type,rate:rateCalculate(data.FAT,data.SNF)})  
    },[])
    const rateCalculate=(fat: number,snf: number)=>(((actualPrice.actualRate*52*fat)/actualPrice.FATRate)+((actualPrice.actualRate*48*snf)/actualPrice.SNFRate));
    const onsubmit=()=>{
        data.totalAmount=(data.quantity*data.rate)
        data.type=data.type?data.type:new Date().getHours() >= 12 ? 'PM' : 'AM'; 
        store.memberStore.addDetails(route.params?.id,data)
        
        navigation.goBack();
    }
    const updateData=(key: string,value:any )=>{
        let rate=data.rate
        if(key=='FAT')rate=rateCalculate(value,data.SNF)
        else if(key=='SNF')rate=rateCalculate(data.FAT,value)
        setData({...data,[key]:value,rate})
        if(key){
            if(!value){
                error[key]=true;
                if(disabledKey?.find(item=>item===key)){}
                else{
                    disabledKey.push(key)
                    setDisabledKey(disabledKey)
                } 
            }else{
                error[key]=false;
                setDisabledKey(event=>event.filter(item=>item!==key))
            }
        }
        setError(error)
    };
    return(
        <View className="bg-cyan-50 rounded-md  items-center flex-col justify-between h-full py-5">
            <View>
                <View className="flex-row justify-between pt-3" >
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">Date</Text>
                        <DatePicker item={data.date} getDateformPicker={(date)=>updateData('date',date)}/>
                    </View>

                    <View className="w-[45%]">
                        <Text className="text-base pb-1">Time</Text>
                        <DropDown
                            value={data.type}
                            onChange={(itemValue, itemIndex) =>updateData('type',(itemValue))}
                            options={options}
                        />
                    
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">FAT</Text>
                        <Input 
                            onChange={(e) =>updateData('FAT',Number(e))}
                            value={data.FAT ? String(data.FAT) :undefined}
                            placeholder="FAT"
                            type="phone-pad"
                        />
                    </View>
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">SNF</Text>
                        <Input
                            placeholder="SNF"
                            value={data.SNF?String(data.SNF):undefined}
                            onChange={(e) => updateData('SNF',Number(e))}
                            type="phone-pad"
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">AWM</Text>
                        <Input
                            placeholder="AWM"
                            value={data.AWM?String(data.AWM):undefined}
                            onChange={(e) => updateData("AWM",Number(e))}
                            type="phone-pad"
                        />
                    </View>
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">Quantity</Text>
                        <Input
                            placeholder="Quantity"
                            value={data.quantity?String(data.quantity):undefined}
                            onChange={(e) => updateData('quantity',Number(e))}
                            type="phone-pad"
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">Rate</Text>
                        <Text className="text-base pb-1 pl-2">{data?.rate ?Number(data.rate).toFixed(2):'0.00'}</Text>
                    </View>
                    <View className="w-[45%]"> 
                        <Text className="text-base pb-1">Total Amount</Text>
                        <Text className="text-base pb-1 pl-1">{data?.quantity && data?.rate ?Number(data.rate*data.quantity).toFixed(2): '0.00' }</Text>
                    </View>
                </View>
                
            </View>
            <View className="flex-row pt-3 justify-center">
                <Button disabled={disabledKey.length!==0} onPress={onsubmit}/>
            </View>
        </View>
    )

}
export default EditDetailsScreen;