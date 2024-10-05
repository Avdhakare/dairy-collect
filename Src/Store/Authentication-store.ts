import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseStore, StoreConstructorArgs } from "./base-store";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADMIN, PRICE } from "../Constant";

export class  AuthenticationStore extends BaseStore {
    administrator:ADMIN[]=[]
    signIN=false;
    admin:ADMIN={} as ADMIN;
    price:PRICE={}as PRICE;
    constructor(args:StoreConstructorArgs){
        super(args);
        makeObservable(this,{
            administrator:observable,
            signIN:observable,
            admin:observable,
            createAdministrator:action.bound,
            signInAdministrator:action.bound,
            updateProfileImage:action.bound,
            updateProfile:action.bound,
            logout:action.bound,

        })
        void makePersistable(this,{
            name: "authetication-store",
            storage: AsyncStorage,
            properties: ["administrator","admin"]
        }).then((data)=>{
            console.log("store is persisted")
            this.signInAdministrator(this.admin.mobileNumber,this.admin.password)
        })
    }
    createAdministrator=(admin:ADMIN)=>{
        admin.id=String(new Date().getTime())+','+ String(admin.mobileNumber)
        admin.createTimestamp=new Date().getTime()
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
                    this.price=user.price;
                })
            }
        }
    }
    updateProfileImage=(key:string,value:string)=>{
        const data:any=this.admin;
        data[key]=value;
        data.updateTimestamp=new Date().getTime();
        runInAction(()=>{
            this.admin=data;
            this.administrator=this.administrator.map((item:ADMIN)=>{
                if(Number(item.mobileNumber)===Number(this.admin.mobileNumber)) return {...this.admin}
                else return item
            })
        })
    }
    updateProfile=(data:ADMIN)=>{
        data.updateTimestamp=new Date().getTime();
        runInAction(()=>{
            this.admin={...data};
            this.administrator=this.administrator.map((item:ADMIN)=>{
                if(Number(item.mobileNumber)===Number(data.mobileNumber)) return {...data}
                else return item
            })
        })
        return true;
    }
    logout=()=>{
        runInAction(()=>{
            this.signIN=false;
            this.admin={} as ADMIN;
            this.price={} as PRICE;
        })
    }
    updatePrice=(prices:PRICE)=>{
        const data:ADMIN=this.admin;
        this.price=prices
        data.price=prices;
        data.updateTimestamp=new Date().getTime();
        runInAction(()=>{
            this.admin=data;
            this.administrator=this.administrator.map((item:ADMIN)=>{
                if(Number(item.mobileNumber)===Number(this.admin.mobileNumber)) return {...this.admin}
                else return item
            })
        })

    }


}