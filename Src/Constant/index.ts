import { Route } from "@react-navigation/native";
import { GestureResponderEvent, KeyboardTypeOptions, NativeSyntheticEvent, TargetedEvent, TextInputFocusEventData } from "react-native";

export interface addPopup {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (user: user) => void;
}
  
export interface user {
    name: string;
    startDate: number;
    endDate: number;
    image: string;
    mobileNumber: string;
}
export interface cameraOpen{
    setCameraVisible:(value:boolean)=>void;
    setPicture:(value:any)=>void
} 
export interface profile {
    name: string;
    id: string;
    image: string;
    totalAmount: number;
    dueAmount: number;
    mobileNumber: string;
    startDate: EpochTimeStamp;
    endDate: EpochTimeStamp;
    details:slipData[]
}
export interface slipData{
    ID: string;
    date: EpochTimeStamp;
    type: string;
    FAT: number;
    SNF: number;
    milkType: string;
    AWM: number;
    quantity: number;
    rate: number;
    totalAmount: number;
}
export interface dateFormet{
    endDate:EpochTimeStamp,
    startDate:EpochTimeStamp
}
 export interface buttonGroup{
    dateSelect:dateFormet
    setDateSelect:(data:dateFormet)=>void,
}
export interface datePicker{
    item:EpochTimeStamp,
    getDateformPicker:(item:EpochTimeStamp)=>void
}
export interface addDetailPupUp{
    isVisible:boolean, 
    onClose:()=>void,
    onSubmit:(data:slipData)=>void,
    actualPrice:actualPrice
  }
export interface actualPrice{
    SNFRate:number,
    FATRate:number,
    actualRate:number
}
export interface detailTable{
    hideProfile:boolean,
    setHideProfile:(e:boolean)=>void
}
export type responseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
    | 'formdata';


export interface AuthenticationResult extends AuthenticationTimestampData {
    access_token: string,
    refresh_token: string,
}    
export interface AuthenticationTimestampData {
    expires_in: number,
    authenticated_timestamp: number,
    expire_timestamp: number,
}
export enum TokenState {
    EXPIRED = 'EXPIRED',
    NOT_FOUND = 'NOT_FOUND',
    VALID = 'VALID',
}
export  interface INPUT{
    onChange:((value:string)=>void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)|undefined;
    value:string | undefined;
    placeholder:string| undefined;
    type?:KeyboardTypeOptions;
    isSecure?:boolean;
    maxLength?:number;
}
export interface DropDownEnum {
    value:number|string|undefined,
    onChange:(itemValue: number|string|undefined, itemIndex: number) => void;
    onBlur?:(e: NativeSyntheticEvent<TargetedEvent>) => void;
    options:any;
    placeholder?:string|undefined;
    enabled?:boolean;
}
  
export interface BUTTON{
    title?:string | undefined,
    disabled?:boolean;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface INotificationData{
  title?: string,
  message: string,
  type: NotificationType,
}
export interface SCREEN{
    navigation?:any;
    route?:any;
}
