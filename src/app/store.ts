import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { modeReducer } from "features/mode";
import { constructorReduer } from "features/constructor";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    constructor: constructorReduer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
