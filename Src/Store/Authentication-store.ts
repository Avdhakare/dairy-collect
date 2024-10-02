import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseStore, StoreConstructorArgs } from "./base-store";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADMIN } from "../Constant";

export class  AuthenticationStore extends BaseStore {
    administrator:ADMIN[]=[]
    signIN=false;
    admin:ADMIN={} as ADMIN
    constructor(args:StoreConstructorArgs){
        super(args);
        makeObservable(this,{
            administrator:observable,
            signIN:observable,
            admin:observable,
            createAdministrator:action.bound,
            signInAdministrator:action.bound

        })
        void makePersistable(this,{
            name: "authetication-store",
            storage: AsyncStorage,
            properties: ["administrator","admin"]
        }).then((data)=>{
            console.log("store is persisted")
            // this.admin={} as ADMIN
            this.signInAdministrator(this.admin.mobileNumber,this.admin.password)
        })
    }
    createAdministrator=(admin:ADMIN)=>{
        admin.id=this.administrator.length+1
        admin.date=new Date().getTime()
        try{
            if(this.administrator.find((item:ADMIN)=>Number(item.mobileNumber)===Number(admin.mobileNumber))){}
            else{     
                runInAction(()=>{
                    this.administrator.push(admin);
                    this.admin=admin;
                    this.signIN=true;
                })
            }
        }catch(error){

        }finally{

        }
    }
    signInAdministrator=(mobileNumber:string|undefined,password:string|undefined)=>{
        const user= this.administrator.find((item:ADMIN)=>Number(item.mobileNumber)===Number(mobileNumber))
        if(user){
            if(user.password===password){
                runInAction(()=>{
                    this.admin=user;
                    this.signIN=true; 
                })
            }
        }
    }

}