import React, { FC } from "react";

const Button: FC<ButtonProps> = ({
  type,
  event,
  value,
  isReady,
}: ButtonProps) => {
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

  return (
    <button
      onClick={event}
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
  event: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: string;
  isReady: boolean;
}

export default Button;
