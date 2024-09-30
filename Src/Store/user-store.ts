import { makePersistable } from "mobx-persist-store";
import { BaseStore, StoreConstructorArgs } from "./base-store";
import { makeObservable, observable, action, computed, runInAction } from 'mobx';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { profile } from "../Constant";

export class userStore  extends BaseStore{
    users:any=[]
    
    constructor(args:StoreConstructorArgs){
        super(args);
        makeObservable(this, {
            users:observable,
            addMember:action.bound
        })
        void makePersistable(this, {
            storage: AsyncStorage,
            name: "user_store",
            properties: ["users"]
        });
    }
    addMember=(data:profile)=>{
        data.id=this.users?.length+1
        data.details=[]
        if(this.users?.find((item:profile)=>Number(item.mobileNumber)===Number(data?.mobileNumber))) return
        runInAction(()=>{
            this.users.push(data)
        })
     

    }

}