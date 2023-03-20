import React, { FC, ReactNode } from "react";

// Redux hooks
import { useAppSelector } from "app/hooks";

// Components
import { Button, Display } from "components";

const Control: FC<ControlProps> = ({
  isOnCanvas = false,
  type,
}: ControlProps) => {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];
  const operators = ["/", "*", "-", "+"];
  const mode = useAppSelector((state) => state.mode.mode);

  const style =
    "flex justify-center gap-2 shadow-md p-1 w-[250px] flex-wrap rounded-md cursor-grab";

  let content: ReactNode;

  switch (type) {
    case "nubmbers":
      content = numbers.map((number) => {
        return (
          <Button
            type="nubmber"
            event={() => {}}
            value={number}
            isReady={isOnCanvas && mode === "runtime"}
          />
        );
      });
      break;
    case "operators":
      content = operators.map((operator) => {
        return (
          <Button
            type="operator"
            event={() => {}}
            value={operator}
            isReady={!isOnCanvas && mode === "runtime"}
          />
        );
      });
      break;
    case "display":
      content = <Display />;
      break;
    default:
      content = (
        <Button
          type="equal"
          event={() => {}}
          value="="
          isReady={isOnCanvas && mode === "runtime"}
        />
      );
  }
  return (
    <div
      className={
        (!isOnCanvas && mode === "constructor") ||
        (isOnCanvas && mode === "runtime")
          ? `${style} opacity-50`
          : style
      }
      draggable={mode !== "runtime"}
    >
      {content}
    </div>
  );
};

interface ControlProps {
  type: "nubmbers" | "operators" | "equal" | "display";
  isOnCanvas: boolean;
}

export default Control;
