import React, { FC, ReactNode, ReactElement, createContext } from 'react';
import { RootStore } from './Src/Store/Store';

export const GlobalStore = new RootStore();

export const GlobalStoreContext = createContext<RootStore>(GlobalStore);

export type StoreComponent = FC<{
  store: RootStore;
  children: ReactNode;
}>;

export const GlobalStoreProvider: StoreComponent = ({ children, store }): ReactElement =>
  (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );