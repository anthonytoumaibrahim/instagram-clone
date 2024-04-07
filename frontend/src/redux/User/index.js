import { createSlice } from "@reduxjs/toolkit";

// Helpers
import {
  getLocalUser,
  setLocalUser,
  removeLocalUser,
} from "../../core/tools/local/user";

const initState = {
  token: getLocalUser()?.token ?? null,
  avatar: getLocalUser()?.avatar ?? null,
};

export const userSlice = createSlice({
  initialState: initState,
  name: "userSlice",
  reducers: {
    addUser: (state, action) => {
      const { token, avatar } = action.payload;
      state.token = token;
      state.avatar = avatar;
      setLocalUser(state);
    },
    updateUser: (state, action) => {
      const { token, avatar } = action.payload;
      state.token = token ?? state.token;
      state.avatar = avatar ?? state.avatar;
      setLocalUser(state);
    },
    removeUser: (state, action) => {
      state.token = null;
      state.avatar = null;
      removeLocalUser();
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;
