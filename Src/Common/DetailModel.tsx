import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { TouchableOpacity, View,Text,StyleSheet, TextInput} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';
import { addDetailPupUp, slipData } from "../Constant";
import DatePicker from "./DatePicker";
import Input from "./Input";
import DropDown from "./DropDown";
import Button from "./Button";

const  DetailModel:React.FC<addDetailPupUp> =({isVisible, onClose, onSubmit,actualPrice})=>{
    const [data, setData] = useState<slipData>({}as slipData);
    const [error,setError]=useState<any>({FAT:false,SNF:false,AWM:false,quantity:false})
    const [disabledKey,setDisabledKey]=useState(['FAT',"SNF",'AWM','quantity'])
    const options = ['AM','PM'];
    useEffect(()=>{
        let date=new Date().getTime()
        let type=new Date().getHours() >= 12 ? 'PM' : 'Am';
        setData({...data,date,type,rate:rateCalculate(data.FAT,data.SNF)})  
    },[])
    const rateCalculate=(fat: number,snf: number)=>(((actualPrice.actualRate*52*fat)/actualPrice.FATRate)+((actualPrice.actualRate*48*snf)/actualPrice.SNFRate));
    const onsubmit=()=>{
        data.totalAmount=(data.quantity*data.rate)
        data.type=new Date().getHours() >= 12 ? 'PM' : 'AM'; 
        onSubmit(data)
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
        <Modal isVisible={isVisible}>
            <View className="bg-cyan-50 p-3 rounded-md  items-center px-5 flex-col justify-between">
                <View style={styles.header}>
                    <Text className="text-green-600 text-lg font-bold" >Add Information</Text>
                    <TouchableOpacity onPress={onClose}>
                        <FontAwesome name="times" size={24} color="red"/>
                    </TouchableOpacity>
                </View>
                <View style={{width:"100%",padding:10}}>
                    <View className="flex-row justify-between pt-3" >
                        <View className="w-[40%]">
                            <Text style={styles.dateText}>Date</Text>
                            <DatePicker item={data.date} getDateformPicker={(date)=>updateData('date',date)}/>
                        </View>
     
                        <View className="w-[40%]">
                            <Text className="text-base pb-1">Time</Text>
                            <DropDown
                                value={data.type}
                                onChange={(itemValue, itemIndex) =>updateData('type',(itemValue))}
                                options={options}
                            />
                           
                        </View>
                    </View>
                    <View className="flex-row justify-between pt-3" >
                        <View className="w-[40%]">
                            <Text className="text-base pb-1">FAT</Text>
                            <Input 
                                onChange={(e) =>updateData('FAT',Number(e))}
                                value={data.FAT ? String(data.FAT) :undefined}
                                placeholder="FAT"
                                type="phone-pad"
                            />
                        </View>
                        <View className="w-[40%]">
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
                        <View  className="w-[40%]">
                            <Text className="text-base pb-1">AWM</Text>
                            <Input
                                placeholder="AWM"
                                value={data.AWM?String(data.AWM):undefined}
                                onChange={(e) => updateData("AWM",Number(e))}
                                type="phone-pad"
                            />
                        </View>
                        <View  className="w-[40%]">
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
                        <View className="w-[40%]">
                            <Text className="text-base pb-1">Rate</Text>
                            <Text className="text-base pb-1 pl-2">{data?.rate ?Number(data.rate).toFixed(2):'0.00'}</Text>
                        </View>
                        <View className="w-[40%]"> 
                            <Text className="text-base pb-1">Total Amount</Text>
                            <Text className="text-base pb-1 pl-1">{data?.quantity && data?.rate ?Number(data.rate*data.quantity).toFixed(2): '0.00' }</Text>
                        </View>
                    </View>
                    
                </View>
                <View className="flex-row pt-3 justify-center">
                  <Button disabled={disabledKey.length!==0} onPress={onsubmit}/>
                </View>
            </View>
        </Modal>
    )

  }
  const styles = StyleSheet.create({
   
    detailContainer:{
        flexDirection:"row",
    },
    ImageContainer:{
        width:100,
        height:100,
        margin:10,
        borderRadius:50,
    },
    flexDirectionRow:{ flexDirection:"row"},
    justifyContentBetween:{justifyContent:"space-between"},
    profileIcon: {
      width: "100%",
      height: "100%",
      borderRadius:40,
      
    },
    detialArea:{
        margin:10
    },
 
    dateText:{
        textTransform:"capitalize",
        fontSize:16,
        fontWeight:"700" 
    },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal:10,
      },
      input: {
        width: '100%',
        borderColor:"black",
        borderWidth:2,
        paddingHorizontal:10,
        borderRadius:10
      },
      imageContainer: {
        width: 100,
        height: 10
      },
      submit:{
        borderRadius:50
      },
      paddingVertical:{
        paddingVertical:10
      },
      paddingTop:{paddingTop:10},
      paddingHorizontal:{paddingHorizontal:10}
  });
  
 

export default DetailModel;