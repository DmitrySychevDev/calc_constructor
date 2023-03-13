import React, { FC, useState, useEffect } from "react";

// Icons
import eyeIcon from "assets/eye.svg";
import eyeIconActive from "assets/eye_active.svg";
import selectorIcon from "assets/selector.svg";
import selectorIconActive from "assets/selector_active.svg";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Slice
import { changeMode } from "./modeSlice";

export const ChangeModeButton: FC<ChangeButtonProps> = ({
  mode,
}: ChangeButtonProps) => {
  const currentMode = useAppSelector((state) => state.mode.mode);
  const dispach = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(currentMode === mode);

  const icons =
    mode === "constructor"
      ? [selectorIcon, selectorIconActive]
      : [eyeIcon, eyeIconActive];

  useEffect(() => {
    setIsActive((prev) => !prev);
  }, [currentMode]);

  return (
    <button
      type="button"
      className="flex border px-4 py-4 items-center gap-2 rounded bg-gray-200 disabled:bg-white"
      disabled={!isActive}
      onClick={() => {
        dispach(changeMode());
      }}
    >
      <div>
        <img
          src={isActive ? icons[0] : icons[1]}
          alt="icon"
          className="w-5 h-5"
        />
      </div>
      <p className="first-letter:uppercase text-base font-sans text-gray-700 font-medium">
        {mode}
      </p>
    </button>
  );
};

interface ChangeButtonProps {
  mode: "constructor" | "runtime";
}
