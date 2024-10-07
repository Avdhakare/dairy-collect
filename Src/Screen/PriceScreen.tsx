import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { PRICE, SCREEN,} from "../Constant";
import Button from "../Common/Button";
import Input from "../Common/Input";
import DatePicker from "../Common/DatePicker";
import { useGlobalStore } from "../Hooks/useGlobalStore";

const PriceScreen=({navigation,route}:SCREEN)=>{
    const [data, setData] = useState<PRICE>({fatQuantity:'52',snfQuantity:'48',date:new Date().getTime()}as PRICE);
    const [error,setError]=useState<any>({SNFPrice:false,FATPrice:false,actualPrice:false})
    const store=useGlobalStore();
    const [disabledKey,setDisabledKey]=useState<string[]>([])
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
    console.log("disabledKey",disabledKey)
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
                            onChange={(e) =>updateData('actualPrice',e)}
                            value={String(data.actualPrice )}
                            placeholder="Actual price"
                            type="phone-pad"
                            error={error?.actualPrice}
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">FAT Price</Text>
                        <Input 
                            onChange={(e) =>updateData('FATPrice',e)}
                            value={String(data.FATPrice )}
                            placeholder="FAT Price"
                            type="phone-pad"
                            error={error?.FATPrice}
                        />
                    </View>
                    <View className="w-[45%]">
                        <Text className="text-base pb-1">SNF</Text>
                        <Input
                            placeholder="SNF Price"
                            value={String(data.SNFPrice)}
                            onChange={(e) => updateData('SNFPrice',e)}
                            type="phone-pad"
                            error={error?.SNFPrice}
                        />
                    </View>
                </View>
                <View className="flex-row justify-between pt-3" >
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">FAT Quantity</Text>
                        <Input
                            placeholder="FAT Quantity"
                            value={String(data.fatQuantity)}
                            onChange={(e) => updateData("fatQuantity",e)}
                            type="phone-pad"
                            error={error?.fatQuantity}
                        />
                    </View>
                    <View  className="w-[45%]">
                        <Text className="text-base pb-1">SNF Quantity</Text>
                        <Input
                            placeholder="SNF Quantity"
                            value={String(data.snfQuantity)}
                            onChange={(e) => updateData('snfQuantity',e)}
                            type="phone-pad"
                            error={error?.snfQuantity}
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