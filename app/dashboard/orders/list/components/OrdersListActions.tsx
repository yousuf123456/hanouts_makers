import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

export const OrdersListActions = () => {
  const [content, setContent] = useState("");

  return (
    <Tooltip
      closeDelay={0}
      content={
        <p className="p-2 rounded-md shadow-md bg-white text-xs">{content}</p>
      }
    >
      <div className="rounded-sm flex gap-4 items-center justify-center w-full">
        <FaEye
          onMouseEnter={() => setContent("View Details")}
          className="w-5 h-5 text-themeSecondary cursor-pointer transition-all hover:opacity-60"
        />
      </div>
    </Tooltip>
  );
};
