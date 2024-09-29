import React, { useEffect, useRef, useState } from 'react';
import {TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { cameraOpen } from '../Constant';

const CameraOpen:React.FC<cameraOpen>=({setCameraVisible,setPicture})=> {
    const [permission, requestPermission]: any = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("front");
    const cameraRef = useRef<CameraView>(null);
    const handleTakePicture = async () => {
        if (cameraRef.current && permission.granted) {
            const photo:any = await cameraRef.current.takePictureAsync();
            setPicture(photo.uri)
            setCameraVisible(false);
        }
      };
      useEffect(() => {
        (async()=>{
            await requestPermission();
        })()
      }, []);

  return (
    <CameraView className="w-full h-full relative" facing={facing} ref={cameraRef}>
        <View className="bg-transparent w-full h-12 px-3 absolute bottom-0">
        <View className="flex flex-row justify-between items-center">
            <TouchableOpacity  onPress={()=>setCameraVisible(false)}>
            <Entypo name="circle-with-cross" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleTakePicture}>
            <FontAwesome name="camera" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>setFacing(current => (current === 'back' ? 'front' : 'back'))}>
            <FontAwesome6 name="rotate" size={30} color="white" />
            </TouchableOpacity>
        </View>
        </View>
    </CameraView>
  );
}

export default CameraOpen;
