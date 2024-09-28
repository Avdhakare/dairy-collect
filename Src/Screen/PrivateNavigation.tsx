import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View,Image } from "react-native";

const PrivateNavigation=()=>{
    const[entries,setEntries]=useState<any>([
        {
          "dueAmount": 10, 
          "endDate": 1708930893309, 
          "id": "1", 
          "mobileNumber": 8445667407, 
          "name": "Avdhesh Dhakare", 
          "image":`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`, 
          "startDate": 1708930893309, 
          "totalAmount": 10000}
    ])
    function epochToDateString(epoch:any) {
        const date = new Date(parseInt(epoch));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      let icona:string='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

    const ListItem = ({ item }:any) =>{
     return(
        <TouchableOpacity onPress={()=>{}} className='bg-pink-500 w-100 px-3 py-5 rounded-2xl mx-1 my-2 flex flex-row justify-between items-center'>
           <Image src={icona} className=" w-20 h-20 rounded-full bg-blue-400"/>
          <View className='w-72'>
            <View className='flex flex-row justify-between'>
              <Text className='text-black text-base  font-bold capitalize mb-1'>{item.name}</Text>
              <Text className='text-black text-base  font-bold capitalize mb-1'>{item.mobileNumber}</Text>
            </View>
             <View className='flex flex-row justify-between'>
              <Text className='text-black font-bold text-[14] mb-1' >Total Amount: {item.totalAmount}</Text>
              <Text className='text-black font-bold text-[14] mb-1' >Due Amount: {item.dueAmount}</Text>
            </View>
            <View className='flex flex-row justify-between'>
              <Text className='text-black text-[12]' >Start Date:{epochToDateString(item.startDate)} </Text>
              <Text className='text-black text-[12]' > End Date: {epochToDateString(item.endDate)} </Text>
            </View>
          </View>
        </TouchableOpacity>
      )};
    return(
        <View>
     {/* <AddPopup isVisible={isPopupVisible} onClose={()=>setPopupVisible(false)} onSubmit={handleClosePopup} /> */}
      <FlatList
        data={entries}
        renderItem={ListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
    )
}
export default PrivateNavigation;