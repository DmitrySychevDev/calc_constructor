import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { modeReducer } from "features/mode";
import { constructorReducer } from "features/constructor";
// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import calculatorReducer from "features/calculator/calculatorSlice";

export const store = configureStore({
  reducer: {
    constructor: constructorReducer,
    mode: modeReducer,
    calculator: calculatorReducer,
  },
  preloadedState: {
    constructor: {
      dashboard: [
        { id: 1, type: "display" },
        { id: 2, type: "operators" },
        { id: 3, type: "nubmbers" },
        { id: 4, type: "equal" },
      ],
      canvas: [],
      dragableBlock: -1,
      hoveredBlock: -1,
    },
    mode: {
      mode: "constructor",
    },
    calculator: {
      currentValue: "0",
      operator: undefined,
      prevValue: undefined,
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
