import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Control } from "types/Control";

interface ConstructorState {
  dashboard: Control[];
  canvas: Control[];
}

const initialState: ConstructorState = {
  dashboard: [
    { id: 1, type: "display" },
    { id: 2, type: "operators" },
    { id: 3, type: "nubmbers" },
    { id: 4, type: "equal" },
  ],
  canvas: [],
};

export const constructorSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    addToCanvas(
      state: ConstructorState,
      action: PayloadAction<{ id: number; index: number }>
    ) {
      const { id, index } = action.payload;
      const controlIndex = state.dashboard.findIndex((elem) => elem.id === id);
      if (controlIndex !== -1) {
        state.canvas.splice(index, 0, state.dashboard[controlIndex]);
        state.dashboard.splice(index, 1);
      }
    },
    deleteFromCanvas(state: ConstructorState, action: PayloadAction<number>) {
      const id = action.payload;
      const controlIndex = state.canvas.findIndex((elem) => elem.id === id);
      if (controlIndex !== -1) {
        state.dashboard.push(state.canvas[controlIndex]);
        state.canvas.splice(controlIndex, 1);
      }
    },
    changeOrder(
      state: ConstructorState,
      action: PayloadAction<{ id: number; to: number }>
    ) {
      const { id, to } = action.payload;
      const controlIndex = state.canvas.findIndex((elem) => elem.id === id);
      if (controlIndex !== -1) {
        state.canvas.splice(to, 0, state.canvas.splice(controlIndex, 1)[1]);
      }
    },
  },
});

export const { addToCanvas, deleteFromCanvas, changeOrder } =
  constructorSlice.actions;

export default constructorSlice.reducer;
