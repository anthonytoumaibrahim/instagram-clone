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
  username: getLocalUser()?.username ?? null,
};

export const userSlice = createSlice({
  initialState: initState,
  name: "userSlice",
  reducers: {
    addUser: (state, action) => {
      const { token, avatar, username } = action.payload;
      state.token = token;
      state.avatar = avatar;
      state.username = username;
      setLocalUser(state);
    },
    updateUser: (state, action) => {
      const { token, avatar, username } = action.payload;
      state.token = token ?? state.token;
      state.avatar = avatar ?? state.avatar;
      state.username = username ?? state.username;
      setLocalUser(state);
    },
    removeUser: (state, action) => {
      state.token = null;
      state.avatar = null;
      state.username = null;
      removeLocalUser();
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;
