import { action, observable, makeObservable } from 'mobx';
import { RootStore } from './Store';
import { NotificationType } from '../Constant';

export interface StoreConstructorArgs {
  stores: RootStore
}

export abstract class BaseStore {
  stores: RootStore;
  isLoading = false;

  protected constructor(args: StoreConstructorArgs) {
    this.stores = args.stores;

    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action.bound,
      notify: action.bound,
      notifyInfo: action.bound,
      notifySuccess: action.bound,
      notifyError: action.bound,
    });
  }

  setIsLoading(value: boolean): void {
    this.isLoading = value;
  }

  notify = (type: NotificationType, message: string): void => {
    const { notificationStore } = this.stores;
    notificationStore.setNotificationData(type, message);
  };

  notifyInfo = (message: string): void => this.notify('info', message);
  notifySuccess = (message: string): void => this.notify('success', message);
  notifyError = (message: string): void => this.notify('error', message);
}