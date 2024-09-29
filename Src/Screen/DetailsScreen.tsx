import { useEffect, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import { View,Text, TouchableOpacity, FlatList } from "react-native";
import { Routes } from "../Constant/Routes";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import AmountCard from "../Common/AmountCard";

const DetailsScreen=({navigation,route}:any)=>{
    const [dateSelect ,setDateSelect]=useState({startDate:new Date().getTime(),endDate:new Date().getTime()})
    useEffect(()=>{
     navigation.setOptions({  
        title:route.params?.item?.name ,
        headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate(Routes.ADD_DETAILS_MODAL,{item:route.params?.item})}>
               <AntDesign name="pluscircleo" size={25} color="green" />
            </TouchableOpacity>
        )
    })
    setDateSelect({
        startDate: route.params?.item?.startDate?route.params?.item?.startDate:new Date().getTime(),
        endDate: route.params?.item?.endDate?route.params?.item?.endDate:new Date().getTime()
     })
},[route,navigation])
const [showDetailCard, setShowDetailCard] = useState(true); // State to control visibility of DetailCard

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    if (scrollOffsetY > 50) {
      setShowDetailCard(false); // Hide DetailCard when scrolled more than 50px
    } else {
      setShowDetailCard(true); // Show DetailCard when scrolled back up
    }
  };

    return(  
        <FlatList
            data={[1,2,3,4,5,6,7,8,9]}
            renderItem={({item})=>(<AmountCard/>)}
            scrollEnabled={true}
            stickyHeaderIndices={[0]}
            onScroll={handleScroll} 
            scrollEventThrottle={16} 
            ListHeaderComponent={
                <View className="mx-2 bg-gray-50">
                    <DetailCard item={route.params?.item} dateSelect={dateSelect}setDateSelect={setDateSelect}/>
                    <ButtonGroups dateSelect={dateSelect} setDateSelect={setDateSelect}/>
                </View>
            }
        />
    )
}
export default DetailsScreen;