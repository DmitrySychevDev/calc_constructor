import React, { FC } from "react";

import { useAppSelector } from "app/hooks";

const Display: FC = () => {
  const currentValue = useAppSelector((state) => state.calculator.currentValue);

  return (
    <div className="flex flex-row justify-end text-xl bg-gray-100 w-[100%] p-1 rounded-md">
      <p className="text-right">{currentValue}</p>
    </div>
  );
};

export default Display;
