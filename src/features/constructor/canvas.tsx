import React, { FC, useState, useEffect } from "react";

// Redux hooks
import { useAppSelector, useAppDispatch } from "app/hooks";

// Images
import canvasIcon from "assets/canvas.svg";

import { addToCanvas, changeOrder, setHoveredBlock } from "./constructorSlice";

// Components
import Conrol from "./control";

const Canvas: FC = () => {
  const elements = useAppSelector((state) => state.constructor.canvas);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<string>(
    "w-[255px] h-[448px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
  );

  const dispach = useAppDispatch();

  useEffect(() => {
    if (elements.length) {
      setStyle((prev) => prev.replace("items-center justify-center", ""));
    } else {
      setStyle(
        "w-[255px] h-[448px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
      );
    }
  }, [elements]);

  const dragOverHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (!elements.length) {
      e.preventDefault();
      setIsHovered(true);
    }
  };

  const dragLeaveHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const dropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dispach(addToCanvas());
    setIsHovered(false);
  };
  return (
    <div
      className={isHovered ? `${style} bg-blue-100` : style}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      <div>
        {elements?.length ? (
          elements.map((elem) => {
            return (
              <Conrol type={elem.type} key={elem.id} isOnCanvas id={elem.id} />
            );
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
