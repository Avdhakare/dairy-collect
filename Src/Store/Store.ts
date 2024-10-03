import { AuthenticationStore } from "./Authentication-store";
import { NotificationStore } from "./notification-store";
import { memberStore } from "./member-store";

export class RootStore {
    
  
    constructor() {
        const storeArgs = {
            stores: this,
          };
        this.notificationStore = new NotificationStore(storeArgs);
        this.memberStore=new memberStore(storeArgs)
        this.authenticationStore=new AuthenticationStore(storeArgs)

    }

    memberStore:memberStore
    notificationStore: NotificationStore;
    authenticationStore:AuthenticationStore

  }