import { View } from "react-native";
import Modal from "react-native-modal";

const PopOver=({isVisible,setIsVisible,children}:any)=>(
    <Modal  isVisible={isVisible} onBackdropPress={() => setIsVisible(!isVisible)} >
        <View className="flex items-center justify-center h-screen">
            <View className="bg-white rounded-md p-2">{children}</View>
        </View>
    </Modal>
)

export default PopOver;