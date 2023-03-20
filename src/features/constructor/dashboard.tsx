import React, { FC } from "react";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Components
import Control from "./control";

// Actions
import { setDragbleBlock } from "./constructorSlice";

const Dashboard: FC = () => {
  const controlsId = [1, 2, 3, 4];

  return (
    <div className="flex flex-col gap-4">
      <Control type="display" isOnCanvas />
      <Control type="operators" isOnCanvas />
      <Control type="nubmbers" isOnCanvas />
      <Control type="equal" isOnCanvas />
    </div>
  );
};

export default Dashboard;
