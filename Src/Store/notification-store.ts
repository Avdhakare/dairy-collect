import { action, observable, makeObservable } from 'mobx';
import { BaseStore, StoreConstructorArgs } from './base-store';
import { INotificationData, NotificationType } from '../Constant/Notification';

export class NotificationStore extends BaseStore {
  notificationData: INotificationData = {} as INotificationData;

  constructor(args: StoreConstructorArgs) {
    super(args);
    makeObservable(this, {
      notificationData: observable,
      setNotificationData: action.bound,
    });
  }

  setNotificationData(type: NotificationType, message: string): void {
    this.notificationData = {
      type,
      message
    };
  }
}
