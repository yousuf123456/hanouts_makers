import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface LayoutPreviewProps {
  index: number;
  pcOnly: boolean;
  layoutName: string;
  mobileOnly: boolean;
  previewImage: string;
}

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({
  index,
  pcOnly,
  layoutName,
  mobileOnly,
  previewImage,
}) => {
  return (
    <Draggable draggableId={`${layoutName}`} index={index}>
      {(provided) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex flex-col gap-2  cursor-move"
          >
            <p className="font-roboto">
              {layoutName +
                (mobileOnly ? " (Mobile Only) " : "") +
                (pcOnly ? " (PC Only) " : "")}

              {/* Show Preview Image Of Layout Here  */}
              <div className="w-full h-28 bg-blue-100 rounded-sm" />
            </p>
          </div>
        </>
      )}
    </Draggable>
  );
};
