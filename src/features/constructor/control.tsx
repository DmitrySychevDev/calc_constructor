import React, { FC, ReactNode, useState, useEffect } from "react";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Components
import { Button, Display } from "components";

// Constructor actions
import {
  setDragbleBlock,
  setHoveredBlock,
  addToCanvas,
  changeOrder,
  deleteFromCanvas,
} from "./constructorSlice";

const Control: FC<ControlProps> = ({
  id,
  isOnCanvas = false,
  type,
}: ControlProps) => {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];
  const operators = ["/", "*", "-", "+"];

  const [style, setStyle] = useState<string>(
    "control flex justify-center gap-2 shadow-md p-1 w-[250px] flex-wrap rounded-md cursor-grab"
  );

  const mode = useAppSelector((state) => state.mode.mode);
  const hoveredIndex = useAppSelector(
    (state) => state.constructor.hoveredBlock
  );

  const dispach = useAppDispatch();

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    dispach(setDragbleBlock(id));
  };
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isOnCanvas) {
      setStyle(
        "control flex justify-center gap-2 shadow-md p-1 w-[250px] flex-wrap rounded-md cursor-grab border-b border-blue-500"
      );
      dispach(setHoveredBlock(id));
    }
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isOnCanvas) {
      setStyle(
        "control flex justify-center gap-2 shadow-md p-1 w-[250px] flex-wrap rounded-md cursor-grab"
      );
      dispach(setHoveredBlock(-1));
    }
  };

  const onDropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    setStyle(
      "control flex justify-center gap-2 shadow-md p-1 w-[250px] flex-wrap rounded-md cursor-grab"
    );
    if (isOnCanvas && hoveredIndex === -1) {
      dispach(addToCanvas());
    } else if (isOnCanvas) {
      dispach(changeOrder());
    }
  };

  const dbClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isOnCanvas && mode === "constructor") {
      dispach(deleteFromCanvas(id));
    }
  };

  useEffect(() => {
    if (mode === "runtime") {
      setStyle((prev) => prev.replace(" cursor-grab", " cursor-auto"));
    } else {
      setStyle((prev) => prev.replace(" cursor-auto", " cursor-grab"));
    }
  });

  let content: ReactNode;

  switch (type) {
    case "nubmbers":
      content = numbers.map((number) => {
        return (
          <Button
            type="nubmber"
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
            value={operator}
            isReady={isOnCanvas && mode === "runtime"}
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
          ? style
          : `${style} opacity-50`
      }
      draggable={mode !== "runtime"}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDropHandler}
      onDoubleClick={dbClickHandler}
    >
      {content}
    </div>
  );
};

interface ControlProps {
  type: "nubmbers" | "operators" | "equal" | "display";
  isOnCanvas: boolean;
  id: number;
}

export default Control;
