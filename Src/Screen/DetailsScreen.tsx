import { useEffect, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import { View,TouchableOpacity, FlatList } from "react-native";
import { Routes } from "../Constant/Routes";
import DetailCard from "../Common/DetailCard";
import ButtonGroups from "../Common/ButtonGroups";
import AmountCard from "../Common/AmountCard";
import { SCREEN } from "../Constant";

const DetailsScreen=({navigation,route}:SCREEN)=>{
    const [dateSelect ,setDateSelect]=useState({startDate:new Date().getTime(),endDate:new Date().getTime()})
    const [showDetailCard, setShowDetailCard] = useState(true);

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
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    if (scrollOffsetY > 50) setShowDetailCard(false);
    else setShowDetailCard(true); 
  };

    return( 
        <View className="mx-2">
            {showDetailCard &&(<DetailCard item={route.params?.item} dateSelect={dateSelect}setDateSelect={setDateSelect}/>)}
            <FlatList
                data={[1,2,3,4,5,6,7,8,9]}
                renderItem={({item})=>(<AmountCard />)}
                scrollEnabled={true}
                stickyHeaderIndices={[0]}
                onScroll={handleScroll} 
                scrollEventThrottle={16} 
                ListHeaderComponent={
                    <View className="bg-gray-50 shadow-lg">
                        <ButtonGroups dateSelect={dateSelect} setDateSelect={setDateSelect}/>
                    </View>
                }
            />
        </View>
    )
}
export default DetailsScreen;