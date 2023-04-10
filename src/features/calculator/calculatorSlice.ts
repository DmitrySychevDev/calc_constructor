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
      if (state.currentValue.length < 13) {
        if (
          !(
            (state.currentValue.includes(",") && payload === ",") ||
            (state.currentValue === "0" && payload === "0")
          )
        ) {
          if (
            state.currentValue === "0" ||
            state.currentValue === "Не присвоенно"
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
      }
    },
    setOperator(state, action: PayloadAction<"+" | "-" | "*" | "/">) {
      const { payload } = action;

      if (state.prevValue !== undefined && state.operator !== undefined) {
        const currentValue = parseFloat(state.currentValue.replace(",", "."));
        switch (state.operator) {
          case "+":
            state.prevValue += state.prevValue;
            break;
          case "-":
            state.prevValue -= currentValue;
            break;
          case "*":
            state.prevValue *= currentValue;
            break;
          case "/":
            if (currentValue) {
              state.prevValue /= currentValue;
            } else {
              state.currentValue = "Не присвоенно";
              state.prevValue = undefined;
            }
            break;
          default:
            console.error("Invalid operator");
        }
      } else {
        state.prevValue = parseFloat(state.currentValue.replace(",", "."));
      }
      state.currentValue = "0";
      state.operator = payload;
    },
    getResult(state) {
      if (state.prevValue && state.operator) {
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
      } else if (!state.operator) {
        state.currentValue = state.prevValue?.toString() ?? "Не присвоенно";
      }
      if (state.currentValue.length > 13) {
        const [integer] = state.currentValue.split(",");
        if (integer.length > 12) {
          state.currentValue = integer.slice(0, 13);
        } else if (integer.length === 13) {
          state.currentValue = Math.round(
            parseFloat(state.currentValue.replace(",", "."))
          ).toString();
        } else {
          const digits = 13 - integer.length;
          state.currentValue = parseFloat(
            state.currentValue.replace(",", ".")
          ).toFixed(digits);
        }
      }

      state.prevValue = undefined;
      state.operator = undefined;
    },
  },
});

export const { setValue, setOperator, getResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
