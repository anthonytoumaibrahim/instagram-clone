import { createSlice } from "@reduxjs/toolkit";

const initState = [];

export const postsSlice = createSlice({
  initialState: initState,
  name: "postsSlice",
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
    addPost: (state, action) => {
      return [
        ...state,
        action.payload
      ]
    },
    likePost: (state, action) => {
      const id = action.payload;
      return state.map((post) => {
        const { liked_by_user, liked_by_users_count } = post;
        return post.id === id
          ? {
              ...post,
              liked_by_users_count: !liked_by_user
                ? liked_by_users_count + 1
                : liked_by_users_count - 1,
              liked_by_user: !liked_by_user,
            }
          : post;
      });
    },
    addComment: (state, action) => {
      const id = action.payload;
      return state.map((post) => {
        const { comments_count } = post;
        return post.id === id
          ? {
              ...post,
              comments_count: comments_count + 1,
            }
          : post;
      });
    },
  },
});

export const { setPosts, likePost, addComment } = postsSlice.actions;
