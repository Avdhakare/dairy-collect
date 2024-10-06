import {Text, View } from "react-native";
const DairySlipModel=({isSlip,adminName,member,getDate}:any)=>(
        <View className="flex items-center justify-center min-h-screen">
            <View className="bg-white p-6 border border-gray-300 w-80">
                <Text className="text-center font-bold text-lg mb-4 uppercase">{adminName && adminName} DAIRY</Text>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">DATE:</Text>
                    <Text>{isSlip?.date && getDate(isSlip?.date,'getDate')}</Text>
                    <Text className="font-bold">SHIFT:</Text>
                    <Text>{isSlip?.type}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">Name</Text>
                    <Text>{member?.name}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">Phone NO</Text>
                    <Text>{member?.mobileNumber}</Text>
                </View>
                <View className="border-t border-black mb-2" />
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">FAT</Text>
                    <Text>{isSlip?.FAT}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">SNF</Text>
                    <Text>{isSlip?.SNF}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">LITRE</Text>
                    <Text>{isSlip?.quantity}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">AWM</Text>
                    <Text>{isSlip?.AWM}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">RATE PER LITRE</Text>
                    <Text>{isSlip?.price}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold">TOTAL AMOUNT</Text>
                    <Text>{isSlip?.totalAmount}</Text>
                </View>
                <View className="border-t border-black mb-2" />
                <View className="flex-row justify-center items-center mb-2 relative h-5">
                    <Text className=" absolute left-[170] top-1">*** </Text>
                    <Text className="">WellCOME</Text>
                    <Text className="absolute right-[170] top-1"> ***</Text>
                </View>
            </View>
        </View>
    );
export default DairySlipModel;