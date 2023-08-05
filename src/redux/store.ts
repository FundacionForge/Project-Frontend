import { UserInfo } from '@/models/user.model';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './state/user.slice';

export interface AppStore {
  user: UserInfo
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
