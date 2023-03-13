import { createSlice } from "@reduxjs/toolkit";

interface ModeState {
  mode: "constructor" | "runtime";
}

const initialState: ModeState = {
  mode: "constructor",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode(state: ModeState) {
      // eslint-disable-next-line no-param-reassign
      state.mode = state.mode === "constructor" ? "runtime" : "constructor";
    },
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
