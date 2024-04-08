import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./User";
import { postsSlice } from "./Posts";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    postsSlice: postsSlice.reducer,
  },
});
