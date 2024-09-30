import { useContext } from 'react';
import { GlobalStoreContext } from '../../GlobalStore';
import { RootStore } from '../Store/Store';

export const useGlobalStore = (): RootStore => useContext(GlobalStoreContext);
