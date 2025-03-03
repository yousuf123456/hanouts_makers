import { createImageUrlFromWebViewLink } from "@/app/dashboard/mediaCenter/components/Image";
import { MediaCenterContent } from "@/app/dashboard/mediaCenter/components/MediaCenterContent";
import { MediaCenterForUploading } from "@/app/dashboard/products/add/components/MediaCenterForUploading";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { MediaCenterContext } from "@/app/store/editor/components/EditorForms";
import { MediaCenterImageType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Delete, Plus } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";

export interface UploadedImageData {
  file: any;
  id: string;
  imageUrl: string;
  fromMediaCenter: boolean;
}

interface UploadBannerImageProps {
  bannerName: string;
  bannerImage: string | undefined;
  orientaion: "Portrait" | "Landscape" | "Square";
  bannersImagesData: { [key: string]: UploadedImageData | undefined };
  setBannersImagesData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: UploadedImageData | undefined;
    }>
  >;
}

export const UploadBannerImage: React.FC<UploadBannerImageProps> = ({
  bannerName,
  orientaion,
  bannerImage,
  bannersImagesData,
  setBannersImagesData,
}) => {
  const { mediaCenterfolderStructure, rootFolderId, mediaCenterImages } =
    useContext(MediaCenterContext);
  const [open, setOpen] = useState(false);

  const onLocalUploadClick = () => {
    document.getElementById(bannerName)?.click();
  };

  const onLocalUploadChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const bannerImageData = {
      id: file.name + String(file.size),
      fromMediaCenter: false,
      imageUrl: imageUrl,
      file,
    };

    setBannersImagesData((prev) => {
      return { ...prev, [bannerName]: bannerImageData };
    });
  };

  const onDelete = () => {
    setBannersImagesData((prev) => ({ ...prev, [bannerName]: undefined }));
  };

  const toggleImageSelection = (image: MediaCenterImageType) => {
    if (bannersImagesData[bannerName])
      setBannersImagesData((prev) => ({ ...prev, [bannerName]: undefined }));
    else {
      setBannersImagesData((prev) => ({
        ...prev,
        [bannerName]: {
          file: null,
          id: image.id,
          fromMediaCenter: true,
          imageUrl: createImageUrlFromWebViewLink(image.imageUrl),
        },
      }));
    }
  };

  const orientationInfo = () => (
    <p className="text-sm font-roboto text-zinc-700">
      Please upload image in{" "}
      <span className="text-themeBlue font-semibold">{orientaion}</span>{" "}
      orientation to get best results. Look at the mini preview to get better
      idea of orientation
    </p>
  );

  return (
    <div className="flex flex-col gap-3 border-[1px] border-slate-300 rounded-sm p-3">
      <input
        hidden
        type="file"
        id={bannerName}
        onChange={onLocalUploadChange}
      />

      <h2 className="capitalize font-roboto text-black">{bannerName}</h2>

      {!bannerImage && (
        <div className="flex gap-6 items-center">
          <div
            onClick={onLocalUploadClick}
            className="w-20 h-20 flex-shrink-0 rounded-sm border-themeBlue border-1 border-dashed flex items-center justify-center cursor-pointer"
          >
            <Plus className="w-6 h-6 text-themeBlue" />
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div>
                <Button variant={"outline"} onClick={() => setOpen(true)}>
                  Upload From Media Center
                </Button>
              </div>

              {orientationInfo()}
            </div>

            <DialogModel
              open={open}
              setOpen={setOpen}
              className="max-w-5xl max-h-[80%] h-full flex flex-col"
            >
              <DialogHeader>
                <DialogTitle>Upload From Media Center</DialogTitle>
              </DialogHeader>

              <div className="h-full">
                <MediaCenterForUploading
                  nonSelectionImageUrls={[]}
                  rootFolderId={rootFolderId}
                  imageSlotsFull={!!bannerImage}
                  mediaCenterImages={mediaCenterImages}
                  toggleImageSelection={toggleImageSelection}
                  uploadedImages={[bannersImagesData[bannerName]]}
                  mediaCenterfolderStructure={mediaCenterfolderStructure}
                />
              </div>
            </DialogModel>
          </div>
        </div>
      )}

      {bannerImage && (
        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-neutral-100 rounded-sm">
            <Image
              alt="Banner Image"
              src={bannerImage}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Delete
              onClick={onDelete}
              className="w-6 h-6 text-red-500 cursor-pointer"
            />
            {orientationInfo()}
          </div>
        </div>
      )}
    </div>
  );
};
