import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Control } from "types/Control";

interface ConstructorState {
  dashboard: Control[];
  canvas: Control[];
  dragableBlock: number | null;
  hoveredBlock: number | null;
}

const initialState: ConstructorState = {
  dashboard: [
    { id: 1, type: "display" },
    { id: 2, type: "operators" },
    { id: 3, type: "nubmbers" },
    { id: 4, type: "equal" },
  ],
  canvas: [],
  dragableBlock: null,
  hoveredBlock: null,
};

export const constructorSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    addToCanvas(state: ConstructorState) {
      if (state.hoveredBlock !== null && state.dragableBlock !== null) {
        const controlIndex = state.dashboard.findIndex(
          (elem) => elem.id === state.dragableBlock
        );
        if (controlIndex !== -1) {
          state.canvas.splice(
            state.hoveredBlock,
            0,
            state.dashboard[controlIndex]
          );
          state.dashboard.splice(state.dragableBlock, 1);
        }
      } else if (state.hoveredBlock === null) {
        if (state.dragableBlock !== null) {
          const controlIndex = state.dashboard.findIndex(
            (elem) => elem.id === state.dragableBlock
          );
          if (controlIndex !== -1) {
            state.canvas.push(state.dashboard[controlIndex]);
            state.dashboard.splice(state.dragableBlock, 1);
          }
        }
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
    changeOrder(state: ConstructorState) {
      if (state.hoveredBlock !== null) {
        const controlIndex = state.canvas.findIndex(
          (elem) => elem.id === state.hoveredBlock
        );
        if (controlIndex !== -1) {
          state.canvas.splice(
            state.hoveredBlock,
            0,
            state.canvas.splice(controlIndex, 1)[1]
          );
        }
      }
    },
    setDragbleBlock(
      state: ConstructorState,
      action: PayloadAction<number | null>
    ) {
      // eslint-disable-next-line no-param-reassign
      state.dragableBlock = action.payload;
    },
    setHoveredBlock(
      state: ConstructorState,
      action: PayloadAction<number | null>
    ) {
      // eslint-disable-next-line no-param-reassign
      state.hoveredBlock = action.payload;
    },
  },
});

export const {
  addToCanvas,
  deleteFromCanvas,
  changeOrder,
  setDragbleBlock,
  setHoveredBlock,
} = constructorSlice.actions;

export default constructorSlice.reducer;
