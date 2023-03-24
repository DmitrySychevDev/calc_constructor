/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculatorState {
  currentValue: string;
  operator: "+" | "-" | "*" | "/" | undefined;
  prevValue: number | undefined;
}

const initialState: CalculatorState = {
  currentValue: "0",
  operator: undefined,
  prevValue: undefined,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      const { payload } = action;
      if (
        !(
          (state.currentValue.includes(",") && payload === ",") ||
          (state.currentValue === "0" && payload === "0")
        )
      ) {
        if (
          state.currentValue === "0" ||
          state.currentValue === "Не присвоено"
        ) {
          if (payload === ",") {
            state.currentValue = "0,";
          } else {
            state.currentValue = payload;
          }
        } else {
          state.currentValue += payload;
        }
      }
    },
    setOperator(state, action: PayloadAction<"+" | "-" | "*" | "/">) {
      const { payload } = action;
      state.prevValue = parseFloat(state.currentValue.replace(",", "."));

      if (state.prevValue !== undefined && state.operator !== undefined) {
        const currentValue = parseFloat(state.currentValue.replace(",", "."));
        switch (state.operator) {
          case "+":
            state.currentValue = (currentValue + state.prevValue).toString();
            break;
          case "-":
            state.currentValue = (state.prevValue - currentValue).toString();
            break;
          case "*":
            state.currentValue = (state.prevValue * currentValue).toString();
            break;
          case "/":
            state.currentValue =
              currentValue !== 0
                ? (state.prevValue / currentValue).toString()
                : "Не присвоенно";
            break;
          default:
            console.log("Invalid operator");
        }
      } else {
        state.currentValue = "0";
        state.operator = payload;
      }
    },
    getResult(state) {
      if (state.prevValue !== undefined) {
        const currentValue = parseFloat(state.currentValue.replace(",", "."));
        switch (state.operator) {
          case "+":
            state.currentValue = (currentValue + state.prevValue).toString();
            break;
          case "-":
            state.currentValue = (state.prevValue - currentValue).toString();
            break;
          case "*":
            state.currentValue = (state.prevValue * currentValue).toString();
            break;
          case "/":
            state.currentValue =
              currentValue !== 0
                ? (state.prevValue / currentValue).toString()
                : "Не присвоенно";
            break;
          default:
            console.log("Invalid operator");
        }
        state.prevValue = undefined;
        state.operator = undefined;
      }
    },
  },
});

export const { setValue, setOperator, getResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
