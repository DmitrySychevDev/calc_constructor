/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Control } from "types/Control";

interface ConstructorState {
  dashboard: Control[];
  canvas: Control[];
  dragableBlock: number;
  hoveredBlock: number;
}

const initialState: ConstructorState = {
  dashboard: [
    { id: 1, type: "display" },
    { id: 2, type: "operators" },
    { id: 3, type: "nubmbers" },
    { id: 4, type: "equal" },
  ],
  canvas: [],
  dragableBlock: -1,
  hoveredBlock: -1,
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addToCanvas(state) {
      if (state.hoveredBlock !== -1 && state.dragableBlock !== -1) {
        const controlIndex = state.dashboard.findIndex(
          (elem) => elem.id === state.dragableBlock
        );
        const hoveredIndex = state.canvas.findIndex(
          (elem) => elem.id === state.hoveredBlock
        );
        if (controlIndex !== -1) {
          state.canvas.splice(
            hoveredIndex + 1,
            0,
            state.dashboard[controlIndex]
          );
          state.dashboard?.splice(controlIndex, 1);
        }
      } else if (state.hoveredBlock === -1) {
        if (state.dragableBlock !== -1) {
          const controlIndex = state.dashboard.findIndex(
            (elem) => elem.id === state.dragableBlock
          );
          if (controlIndex !== -1) {
            state.canvas.push(state.dashboard[controlIndex]);
            state.dashboard.splice(controlIndex, 1);
          }
        }
      }
    },
    deleteFromCanvas(state, action: PayloadAction<number>) {
      const id = action.payload;
      const controlIndex = state.canvas.findIndex((elem) => elem.id === id);
      if (controlIndex !== -1) {
        state.dashboard.push(state.canvas[controlIndex]);
        state.canvas.splice(controlIndex, 1);
      }
    },
    changeOrder(state) {
      if (state.hoveredBlock !== -1) {
        const controlIndex = state.canvas.findIndex(
          (elem) => elem.id === state.dragableBlock
        );
        const hoveredIndex = state.canvas.findIndex(
          (elem) => elem.id === state.hoveredBlock
        );
        if (controlIndex !== -1 && hoveredIndex !== -1) {
          const temp = state.canvas[controlIndex];
          state.canvas[controlIndex] = state.canvas[hoveredIndex];
          state.canvas[hoveredIndex] = temp;
        }
      }
    },
    setDragbleBlock(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.dragableBlock = action.payload;
    },
    setHoveredBlock(state, action: PayloadAction<number>) {
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

export const constructorReducer = constructorSlice.reducer;
