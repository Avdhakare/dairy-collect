import { TextInput } from "react-native";
import { INPUT } from "../Constant";

const Input=({onChange,onBlur,value,placeholder,maxLength,type="default",isSecure=false}:INPUT)=>(
    <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type}
        onBlur={onBlur}
        secureTextEntry={isSecure}
        onChangeText={onChange}
        maxLength={maxLength}
        className="w-full text-base mt-4 px-4 py-2 border-2  border-green-300 rounded-lg bg-white"
    />
)

export default Input;
