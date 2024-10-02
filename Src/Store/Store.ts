import { AuthenticationStore } from "./Authentication-store";
import { NotificationStore } from "./notification-store";
import { userStore } from "./user-store";

export class RootStore {
    
  
    constructor() {
        const storeArgs = {
            stores: this,
          };
        this.notificationStore = new NotificationStore(storeArgs);
        this.userStore=new userStore(storeArgs)
        this.authenticationStore=new AuthenticationStore(storeArgs)

    }

    userStore:userStore
    notificationStore: NotificationStore;
    authenticationStore:AuthenticationStore

  }