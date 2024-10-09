import { makePersistable } from "mobx-persist-store";
import { BaseStore, StoreConstructorArgs } from "./base-store";
import { makeObservable, observable, action, computed, runInAction } from 'mobx';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PAYMENT, PAYMENTTYPE, PROFILE, slipData } from "../Constant";

export class memberStore  extends BaseStore{
    members:PROFILE[]=[{} as PROFILE ] as PROFILE[];
    member:PROFILE|any={} as PROFILE;
    
    constructor(args:StoreConstructorArgs){
        super(args);
        makeObservable(this, {
            members:observable,
            member:observable,
            addMember:action.bound,
            addDetails:action.bound,
            epochToDateString:action.bound
        })
        void makePersistable(this, {
            storage: AsyncStorage,
            name: "member_store",
            properties: ["members"]
        });
    }
    addMember=(data:PROFILE)=>{
        data.id=String(new Date().getTime())+','+ String(data.mobileNumber)
        data.details=[]
        if(this.members?.find((item:PROFILE)=>(Number(item.mobileNumber)===Number(data?.mobileNumber) && item.adminID===data.adminID))) return
        runInAction(()=>{
            this.members.push(data)
        })
    }
    addDetails=(id:string,data:slipData)=>{
        let members:any= this.members.find((item:PROFILE)=>(item.id===id))
        const IDString= this.epochToDateString(data.date,"ID")
        let status=true;
        if(!members){
            this.notifyError("Member Does not Exist");
            return
        }
        if(members?.details.length!==0){
           const slip= members?.details.find((item:any)=>(item.id===IDString))
           if(slip){
                status=false
                let check=true;
                let deleteAmount=0
                slip.data=slip.data.map((item:slipData)=>{
                    if(item.type===data.type) {
                        deleteAmount=Number(item.totalAmount)
                        check=false;
                        return {...data}
                    }else return item
                })
                if(check) slip.data.push(data)
                members.details=members?.details?.map((item:any)=>{
                    if(item.id===IDString) return{...slip};
                    else return item;
                })
                members.totalAmount=Number(members.totalAmount)+Number(data.totalAmount)
                members.totalAmount=members.totalAmount-deleteAmount
            }
        }
        if(status){
            members.details.push({id:IDString,date:data.date,data:[{...data}]})
            members.totalAmount=Number(members.totalAmount)+Number(data.totalAmount)
        }
        members.updateTimestamp=data.date>=members.updateTimestamp? data.date:members.updateTimestamp
        members.details=members.details.sort((a:any, b:any) => a.date - b.date)
        runInAction(()=>{
            this.members=this.members.map((item:PROFILE)=>{
                if(item.id===id) return {...members}
                else return item
            })
        })       
    }
    setMember=(id:string|undefined,adminID:string|undefined)=>{
        runInAction(()=>{
            this.member=this.members.find((item:PROFILE)=>(item.id===id && item.adminID===adminID))
        })
    }
    setPayment=(data:PAYMENT)=>{
        const paymentData:any[]=this.member?.payment?this.member?.payment:[]
        paymentData.push({...data})
        let debitAmount=0;
        let creditAmount=0;
        paymentData.map(item=>{
            if(item.type===PAYMENTTYPE.DEBIT) debitAmount=debitAmount+Number(item.amount)
            if(item.type===PAYMENTTYPE.CREDIT) creditAmount=creditAmount+Number(item.amount)
        })
       
        runInAction(()=>{
            this.member={...this.member,send:debitAmount,recieved:creditAmount,payment:paymentData.sort((a:any, b:any) => b.date - a.date)}
            this.members=this.members.map((item:PROFILE)=>{
                if(item.id===this.member.id) return {...this.member,send:debitAmount,recieved:creditAmount,payment:paymentData.sort((a:any, b:any) => b.date - a.date)}
                else return item
            })
        })
    }
    epochToDateString(epoch:any,key?:string) {
        const date = new Date(parseInt(epoch));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const monthDup = String(date.getMonth()+1).padStart(2, '0');
        const hour=date.getHours();
        const minute=date.getMinutes()
        const year:any = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' });
        if(key==="ID") return `${day}`+`${monthDup}`+`${year}`;
        if(key==="MONTH") return `${day} ${monthName.substring(0,3).toUpperCase()} ${year}`;
        if(key==="DATE") return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`
        return `${day}/${monthDup}/${year}`;
    }
}

