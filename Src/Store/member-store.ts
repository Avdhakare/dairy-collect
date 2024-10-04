import { makePersistable } from "mobx-persist-store";
import { BaseStore, StoreConstructorArgs } from "./base-store";
import { makeObservable, observable, action, computed, runInAction } from 'mobx';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PROFILE, slipData } from "../Constant";

export class memberStore  extends BaseStore{
    member:PROFILE[]=[]
    
    constructor(args:StoreConstructorArgs){
        super(args);
        makeObservable(this, {
            member:observable,
            addMember:action.bound,
            addDetails:action.bound
        })
        void makePersistable(this, {
            storage: AsyncStorage,
            name: "member_store",
            properties: ["member"]
        });
    }
    addMember=(data:PROFILE)=>{
        data.id=String(new Date().getTime())+','+ String(data.mobileNumber)
        data.details=[]
        if(this.member?.find((item:PROFILE)=>Number(item.mobileNumber)===Number(data?.mobileNumber))) return
        runInAction(()=>{
            this.member.push(data)
        })
    }
    addDetails=(id:string,data:slipData)=>{
        let member:any= this.member.find((item:PROFILE)=>(item.id===id))
        const date= this.epochToDateString(data.date)
        const IDString= this.epochToDateString(data.date,"ID")
        let status=true;
        if(!member){
            this.notifyError("Member Does not Exist");
            return
        }
        if(member?.details.length!==0){
           const slip= member?.details.find((item:any)=>(item.id===IDString))
           if(slip){
                status=false
                slip.data.push(data)
                member.details=member?.details?.map((item:any)=>{
                    if(item.id===IDString) return{...slip}
                    else return item
                })
                member.totalAmount=Number(member.totalAmount)+Number(data.totalAmount)
            }
        }
        if(status){
            member.details.push({id:IDString,date:date,data:[{...data}]})
            member.totalAmount=Number(member.totalAmount)+Number(data.totalAmount)
        }
        member.updateTimestamp=new Date().getTime();
        runInAction(()=>{
            this.member=this.member.map((item:PROFILE)=>{
                if(item.id===id) return {...member}
                else return item
            })
        })       
    }
    epochToDateString(epoch:any,key?:string) {
        const date = new Date(parseInt(epoch));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const monthDup = String(date.getMonth()+1).padStart(2, '0');
        const year:any = date.getFullYear();
        if(key==="ID") return `${day}`+`${monthDup}`+`${year}`;
        return `${day}/${monthDup}/${year}`;
    }
    


}

