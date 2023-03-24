import React, { FC } from "react";

// Redux hooks
import { useAppDispatch } from "app/hooks";

import {
  setValue,
  setOperator,
  getResult,
} from "features/calculator/calculatorSlice";

const Button: FC<ButtonProps> = ({ type, value, isReady }: ButtonProps) => {
  const dispach = useAppDispatch();

  let btnStyle = `rounded-md text-base ${
    isReady
      ? "cursor-pointer pointer-events-all"
      : "cursor-[inherit] pointer-events-none"
  } `;

  switch (type) {
    case "operator":
      btnStyle += "px-5 py-3 text-black border border-solid border-gray-300";
      break;
    case "nubmber":
      btnStyle += "px-8 py-4 text-black border border-solid border-gray-300";
      break;
    case "equal":
      btnStyle += "px-28 py-6 text-white bg-indigo-600 ";
      break;
    default:
      btnStyle = "";
      break;
  }

  if (type === "nubmber" && value === "0") {
    btnStyle = btnStyle.replace("px-8", "px-[71px]");
  }

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (isReady) {
      switch (type) {
        case "nubmber":
          dispach(setValue(value));
          break;
        case "operator":
          if (value === "+" || value === "-" || value === "*" || value === "/")
            dispach(setOperator(value));
          break;
        case "equal":
          dispach(getResult());
          break;
        default:
          console.log("untracked currentValue");
      }
    }
  };

  return (
    <button
      onClick={clickHandler}
      type="button"
      className={btnStyle}
      disabled={!isReady}
    >
      {value}
    </button>
  );
};

interface ButtonProps {
  type: "nubmber" | "operator" | "equal";
  value: string;
  isReady: boolean;
}

export default Button;
