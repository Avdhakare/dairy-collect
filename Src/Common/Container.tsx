import { Text, View } from "react-native"


const Container=({containerClass,children}:any)=>{
    return(
        <View className={"m-2 p-2 rounded-md "+containerClass}>
           {children}
        </View>
    )
}

export default Container