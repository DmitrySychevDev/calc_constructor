import React, { FC } from "react";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Components
import Control from "./control";

// Actions
import { setDragbleBlock } from "./constructorSlice";

const Dashboard: FC = () => {
  const controls = useAppSelector((state) => state.constructor.dashboard);
  const mode = useAppSelector((state) => state.mode.mode);
  const dispach = useAppDispatch();

  return (
    <div className={mode === "constructor" ? "flex flex-col gap-4" : "hidden"}>
      <Control
        type="display"
        isOnCanvas={controls.findIndex((control) => control.id === 1) === -1}
        id={1}
      />
      <Control
        type="operators"
        isOnCanvas={controls.findIndex((control) => control.id === 2) === -1}
        id={2}
      />
      <Control
        type="nubmbers"
        isOnCanvas={controls.findIndex((control) => control.id === 3) === -1}
        id={3}
      />
      <Control
        type="equal"
        isOnCanvas={controls.findIndex((control) => control.id === 4) === -1}
        id={4}
      />
    </div>
  );
};

export default Dashboard;
