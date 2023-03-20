import React, { FC } from "react";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Images
import canvasIcon from "assets/canvas.svg";

// Components
import Conrol from "./control";

const Canvas: FC = () => {
  const elements = useAppSelector((state) => state.constructor.canvas);

  return (
    <div className="w-[255px] h-[448px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
      <div>
        {elements?.length ? (
          elements.map((elem) => {
            return <Conrol type={elem.type} key={elem.id} isOnCanvas={false} />;
          })
        ) : (
          <div className="flex flex-col items-center text-sm gap-1">
            <div>
              <img src={canvasIcon} alt="canvas icon" />
            </div>
            <h3 className="text-indigo-600">Перетащите сюда</h3>
            <p className="text-gray-500 w-[106px] text-center">
              любой элемент из левой панели
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
