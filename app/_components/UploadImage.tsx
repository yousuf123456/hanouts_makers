import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "../utils/cn";
import { useDrag, useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";
import { createImageUrlFromWebViewLink } from "../dashboard/mediaCenter/components/Image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, Trash2 } from "lucide-react";
import { FormImageType, SelectedImageType } from "../types";
import { swapElements } from "../utils/swapElements";

type ItemType = { arrayIndex: number };

interface UploadImageProps {
  label?: string;
  size?: "small";
  disabled?: boolean;
  arrayIndex: number;
  images: SelectedImageType[];
  image: SelectedImageType | undefined;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImages: React.Dispatch<React.SetStateAction<SelectedImageType[]>>;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  size,
  label,
  image,
  images,
  setImages,
  disabled,
  arrayIndex,
  setUploadOpen,
}) => {
  const onDelete = () => {
    return setImages((prev) =>
      prev.filter((prevImage) => prevImage.id !== image?.id)
    );
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "uploadedImage",
    item: { arrayIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "uploadedImage",
      drop(item) {
        onDrop(item as ItemType);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [images]
  );

  const onDrop = (droppedItem: ItemType) => {
    swapElements(images, setImages, droppedItem.arrayIndex, arrayIndex);
  };

  return (
    <>
      <div
        onClick={() => {
          if (image) return;
          setUploadOpen(true);
        }}
        draggable
        className={cn(
          "w-full flex flex-col gap-2 items-center",
          disabled && "pointer-events-none cursor-not-allowed"
        )}
      >
        <div
          className={cn(
            "w-full h-auto aspect-1 rounded-md border-themeBlue border-[1px] border-dashed",
            size && "w-16 h-16",
            isDragging && "border-red-500"
          )}
        >
          {!image ? (
            <div className="cursor-move w-full h-full flex justify-center items-center">
              <FaPlus
                className={cn(
                  "text-themeSecondary opacity-70 w-4 h-4",
                  size && "w-3 h-3"
                )}
              />
            </div>
          ) : image.isUploading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader2 className=" animate-spin w-5 h-5 text-themeBlue" />
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div
                    ref={(el) => {
                      drag(el);
                      drop(el);
                    }}
                    draggable
                    className="w-full h-full flex items-center cursor-move"
                  >
                    <Image
                      src={createImageUrlFromWebViewLink(image.imageUrl)}
                      alt="Picture"
                      width={"0"}
                      height={"0"}
                      sizes="100vw"
                      className="w-full h-auto"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-3 items-center">
                    <Image
                      src={createImageUrlFromWebViewLink(image.imageUrl)}
                      alt="Picture"
                      width={"0"}
                      height={"0"}
                      sizes="100vw"
                      className="w-28 h-auto"
                    />

                    <Trash2
                      onClick={onDelete}
                      className="text-red-500 hover:text-red-400 transition-all w-5 h-5 cursor-pointer"
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <p className={cn("text-sm text-neutral-700", size && "text-xs")}>
          {label}
        </p>
      </div>
    </>
  );
};
