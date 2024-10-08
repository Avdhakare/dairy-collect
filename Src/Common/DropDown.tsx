import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { DropDownEnum } from "../Constant";

const DropDown=({value,onChange,onBlur,options,placeholder,enabled=true}:DropDownEnum)=>(
    <View  className="border my-2 bg-white border-green-400 rounded-lg h-12" >
        <Picker
            selectedValue={value}
            className="w-full px-2 "
            onValueChange={onChange}
            enabled={enabled}
            onBlur={onBlur}
            placeholder={placeholder}
        >
            {options.map((option:any, index:number) => (
                <Picker.Item label={option} value={option} key={index} />
            ))}
        </Picker>
    </View>
)
export default DropDown;