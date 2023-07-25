import { config } from '@/config'
import { UserInfo } from '@/models'
import { clearLocalStorage, persistLocalStorage } from '@/utils/localStorage.util'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyUserState: UserInfo = {
  username: '',
  role: []
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: localStorage.getItem(config.TOKEN_STORAGE) ? JSON.parse(localStorage.getItem(config.TOKEN_STORAGE) as string) : EmptyUserState,
  reducers: {
    createUser: (_state, action) => {
      persistLocalStorage<UserInfo>(config.TOKEN_STORAGE, action.payload);
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>(config.TOKEN_STORAGE, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(config.TOKEN_STORAGE);
      return EmptyUserState;
    }
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions
