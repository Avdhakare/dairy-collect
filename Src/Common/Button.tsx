import { Text, TouchableOpacity } from "react-native"
import { BUTTON } from "../Constant"

const Button=({title=undefined,disabled=false,onPress}:BUTTON)=>{
    return(
        <TouchableOpacity disabled={disabled} onPressOut={onPress} className="bg-sky-500 self-center py-2 px-8 rounded-lg">
            
            <Text className="text-center text-white text-base font-bold">
                {title?title:"Submit"}
            </Text>
        </TouchableOpacity>
    )
}
export default Button;