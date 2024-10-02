import Modal  from "react-native-modal";
import{Text, View} from "react-native";
import Button from "./Button";

const ProfileModal=({setIsProfile,isProfile}:any)=>{
    return (
        <Modal  isVisible={isProfile}  onBackdropPress={()=>setIsProfile(!isProfile)}>
            <View className="bg-white py-3 px-2 rounded-md">
                <View className="h-[200] border-b-2 border-gray-300 flex flex-col justify-end pb-2">
                    <Button onPress={()=>{}} classNames="w-[90%] py-3" title="Edit Profile"/>
                </View>
                <Text className="">Hello</Text>
            </View>
        </Modal>
    )
}
export default ProfileModal;