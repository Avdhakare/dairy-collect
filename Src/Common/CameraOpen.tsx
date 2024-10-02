import React, { useEffect, useRef, useState } from 'react';
import {TouchableOpacity, View,Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { cameraOpen } from '../Constant';
import AntDesign from '@expo/vector-icons/AntDesign';

const CameraOpen:React.FC<cameraOpen>=({setCameraVisible,setPicture})=> {
    const [permission, requestPermission]: any = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("front");
    const cameraRef = useRef<CameraView>(null);
    const handleTakePicture = async () => {
        if (cameraRef.current && permission.granted) {
            const photo:any = await cameraRef.current.takePictureAsync();
            setPicture(photo.uri)
            setCameraVisible(false);
        }else setCameraVisible(false);
      };
      useEffect(() => {
        (async()=>{
          await requestPermission();
        })()
      }, []);

  return (
    <CameraView className="w-full h-full relative" facing={facing} ref={cameraRef}>
        <View className="w-full h-[100] p-0 absolute bottom-[-10]" >
        <View className="flex flex-row justify-between items-center  px-5" >
            <TouchableOpacity  onPress={()=>setCameraVisible(false)}>
              <AntDesign name="closecircleo" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleTakePicture}>
              <Entypo name="picasa" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>setFacing(current => (current === 'back' ? 'front' : 'back'))}>
            <FontAwesome6 name="rotate" size={50} color="white" />
            </TouchableOpacity>
        </View>
        </View>
    </CameraView>
  );
}

export default CameraOpen;
