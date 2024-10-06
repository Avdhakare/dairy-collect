import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { PRICE, SCREEN,} from "../Constant";
import Button from "../Common/Button";
import Input from "../Common/Input";
import DatePicker from "../Common/DatePicker";
import { useGlobalStore } from "../Hooks/useGlobalStore";

const PriceScreen=({navigation,route}:SCREEN)=>{
    const [data, setData] = useState<PRICE>({fatQuantity:52,snfQuantity:48,date:new Date().getTime()}as PRICE);
    const [error,setError]=useState<any>({SNFPrice:false,FATPrice:false,actualPrice:false})
    const store=useGlobalStore();
    const [disabledKey,setDisabledKey]=useState(['SNFPrice','FATPrice','actualPrice'])
    useEffect(()=>{
        setData(store.authenticationStore.price)
    },[store.authenticationStore.price])
    const onsubmit=()=>{
        store.authenticationStore.updatePrice(data)
        navigation.goBack();
    }
    const updateData=(key: string,value:any )=>{
        setData({...data,[key]:value})
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
                        <Text className="text-base pb-1">Actual Price</Text>
                        <Input 
                            onChange={(e) =>updateData('actualPrice',Number(e))}
                            value={data.actualPrice ? String(data.actualPrice) :undefined}
                            placeholder="Actual price"
                            type="phone-pad"
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">FAT Price</Text>
                        <Input 
                            onChange={(e) =>updateData('FATPrice',Number(e))}
                            value={data.FATPrice ? String(data.FATPrice) :undefined}
                            placeholder="FAT Price"
                            type="phone-pad"
                        />
                    </View>
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">SNF</Text>
                        <Input
                            placeholder="SNF Price"
                            value={data.SNFPrice?String(data.SNFPrice):undefined}
                            onChange={(e) => updateData('SNFPrice',Number(e))}
                            type="phone-pad"
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">FAT Quantity</Text>
                        <Input
                            placeholder="FAT Quantity"
                            value={data.fatQuantity?String(data.fatQuantity):undefined}
                            onChange={(e) => updateData("fatQuantity",Number(e))}
                            type="phone-pad"
                        />
                    </View>
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">SNF Quantity</Text>
                        <Input
                            placeholder="SNF Quantity"
                            value={data.snfQuantity?String(data.snfQuantity):undefined}
                            onChange={(e) => updateData('snfQuantity',Number(e))}
                            type="phone-pad"
                        />
                    </View>
                </View>
            </View>
            <View className="flex-row pt-3 justify-center">
                <Button disabled={disabledKey.length!==0} onPress={onsubmit}/>
            </View>
        </View>
    )

}
export default PriceScreen;