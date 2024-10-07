import { GestureResponderEvent, KeyboardTypeOptions, NativeSyntheticEvent, TargetedEvent, TextInputFocusEventData } from "react-native";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
 export interface ADMIN extends user{
    password:string| undefined;
    confirmPassward:string| undefined;
    email?:string|undefined;
    address?:string|undefined;
    city?:string|undefined;
    pinCode?:string|undefined;
    price?:PRICE |any;
}
export interface PROFILE extends user {
    adminID:string |undefined;
    totalAmount: number;
    dueAmount: number;
    mobileNumber: string;
    details:any
}
export interface PRICE{
    SNFPrice:string;
    FATPrice:string;
    actualPrice:string;
    fatQuantity:string;
    snfQuantity:string;
    date:Timestamp;
}
export interface user extends dateFormet{
    id?:string|undefined;
    name:string| undefined;
    mobileNumber:string|undefined;
    image?:string|undefined;
}


export interface cameraOpen{
    setCameraVisible:(value:boolean)=>void;
    setPicture:(value:any)=>void
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
    price: number;
    totalAmount: number;
}
export interface DAIRYSLIP{
    isSlip:slipData;
    adminName:string;
    member:PROFILE;
    getDate:(value:EpochTimeStamp,key:string)=>void;
}
export interface dateFormet{
    updateTimestamp:EpochTimeStamp,
    createTimestamp:EpochTimeStamp
}
 export interface buttonGroup{
    dateSelect:dateFormet
    setDateSelect:(data:dateFormet)=>void,
}
export interface datePicker{
    item:EpochTimeStamp,
    getDateformPicker:(item:EpochTimeStamp)=>void
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
    readOnly?:boolean;
    error?:boolean;
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
    classNames?:string;
}

export interface SCREEN{
    navigation?:any;
    route?:any;
}
export enum BUTTONGROUPSENUM {
    ALL="ALL",
    YEAR="YEAR",
    WEEK="WEEK",
    MONTH="MONTH",

}
