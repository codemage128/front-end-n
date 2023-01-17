import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/user';

const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: undefined as UserType | undefined,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = {...action.payload};
    }
  }
});

export const { reducer, actions } = slice;
export const { setUserInfo } = slice.actions;
export default slice;
