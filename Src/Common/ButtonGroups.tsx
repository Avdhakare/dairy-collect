import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity,Text, View } from "react-native";
import { buttonGroup } from "../Constant";

const  item=['All','year' ,'month', 'week']

const ButtonGroups=({dateSelect,setDateSelect}:buttonGroup)=>{
    const [selectedIndex, setSelectedIndex] =useState(0);
    useEffect(()=>{
        const days = (dateSelect.endDate - dateSelect.startDate) / (24 * 60 * 60 * 1000)
       if(days<8)setSelectedIndex(3)
       else if(days<32) setSelectedIndex(2)
       else if(days<366)setSelectedIndex(1)
       else setSelectedIndex(0)
     
    },[dateSelect.startDate,dateSelect.endDate])
    const event=(event:EpochTimeStamp)=>{
        let eventDate={startDate:0,endDate:0}
        let date= new Date(dateSelect.endDate)
        eventDate.endDate=dateSelect.endDate
        switch(item[event]){
            case 'All':{
                eventDate.endDate=date.getTime()
                break;
            }
            case'year':{
                eventDate.startDate=new Date(date.getFullYear()-1,date.getMonth(),date.getDate()).getTime()
                break;
            }
           case'month':{
                eventDate.startDate=new Date(date.getFullYear(),date.getMonth()-1,date.getDate()).getTime()
                break;
            }
            case 'week':{
                eventDate.startDate=new Date(date.getFullYear(),date.getMonth(),date.getDate()-7).getTime()
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