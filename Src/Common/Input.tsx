import { TextInput } from "react-native";
import { INPUT } from "../Constant";

const Input=({onChange,onBlur,value,placeholder,maxLength,type="default",isSecure=false,readOnly=false,error=false}:INPUT)=>(
    <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type}
        onBlur={onBlur}
        readOnly={readOnly}
        secureTextEntry={isSecure}
        onChangeText={onChange}
        maxLength={maxLength}
        className={`w-full text-base mt-4 px-4 py-2 border  rounded-lg bg-white ${error?'border-red-400' : 'border-green-400' }  `}
    />
)

export default Input;
