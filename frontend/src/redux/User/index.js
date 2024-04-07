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
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
      setLocalUser(state);
    },
    removeUser: (state, action) => {
      state.token = null;
      state.avatar = null;
      removeLocalUser();
    },
    getIsLoggedIn: (state, action) => {},
  },
});

export const { addUser, removeUser } = userSlice.actions;
