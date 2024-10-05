import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity,Text, View } from "react-native";
import { buttonGroup, BUTTONGROUPSENUM } from "../Constant";

const  item=[BUTTONGROUPSENUM.ALL,BUTTONGROUPSENUM.YEAR ,BUTTONGROUPSENUM.MONTH, BUTTONGROUPSENUM.WEEK]

const ButtonGroups=({dateSelect,setDateSelect}:buttonGroup)=>{
    const [selectedIndex, setSelectedIndex] =useState(0);
    useEffect(()=>{
        const days = (dateSelect.updateTimestamp - dateSelect.createTimestamp) / (24 * 60 * 60 * 1000)
       if(days<8)setSelectedIndex(3)
       else if(days<32) setSelectedIndex(2)
       else if(days<367)setSelectedIndex(1)
       else setSelectedIndex(0)
     
    },[dateSelect.createTimestamp,dateSelect.updateTimestamp])
    const event=(event:EpochTimeStamp)=>{
        let eventDate={createTimestamp:0,updateTimestamp:0}
        let date= new Date(dateSelect.updateTimestamp)
        eventDate.updateTimestamp=dateSelect.updateTimestamp
        switch(item[event]){
            case BUTTONGROUPSENUM.ALL:{
                eventDate.updateTimestamp=date.getTime()
                break;
            }
            case BUTTONGROUPSENUM.YEAR:{
                eventDate.createTimestamp=new Date(date.getFullYear()-1,date.getMonth(),date.getDate()).getTime()
                break;
            }
           case BUTTONGROUPSENUM.MONTH:{
                eventDate.createTimestamp=new Date(date.getFullYear(),date.getMonth()-1,date.getDate()).getTime()
                break;
            }
            case BUTTONGROUPSENUM.WEEK:{
                eventDate.createTimestamp=new Date(date.getFullYear(),date.getMonth(),date.getDate()-7).getTime()
                break;
            }
        }
        setDateSelect(eventDate)
       setSelectedIndex(event)
    }
    return(
        <FlatList
            data={item}
            numColumns={4}
            key={`${4}`.toString()}
            {...(4 > 1? { columnWrapperStyle: { justifyContent: 'space-between' } } : {})}
         
            renderItem={({item,index})=>(
                <View  style={{width:`${(100/4)}%`}}>
                    <TouchableOpacity onPress={()=>event(index)} className={`${selectedIndex===index?'bg-sky-500 border border-sky-500':'bg-white border border-green-400'} rounded-lg mx-1 my-2 py-2`} >
                        <Text className={`${selectedIndex===index?'text-white':'text-slate-500'} text-center text-[16] font-bold capitalize`}>{item}</Text>
                    </TouchableOpacity>
                </View>
            )}
            scrollEnabled={false}
        
        />
    )
} 
export default ButtonGroups;