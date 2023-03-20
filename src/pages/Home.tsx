import React, { FC } from "react";

// components
import { ChangeModeButton } from "features/mode";
import { Canvas, Dashboard } from "features/constructor";

export const Home: FC = () => {
  return (
    <div>
      <div className="flex justify-end mt-10 mr-20">
        <ChangeModeButton mode="runtime" />
        <ChangeModeButton mode="constructor" />
      </div>
      <div className="flex justify-around mt-8">
        <Dashboard />
        <Canvas />
      </div>
    </div>
  );
};
