import React, { useEffect, useState } from "react";

import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadBannerImage, UploadedImageData } from "./UploadBannerImage";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";

interface UploadBannerImagesProps {
  children: React.ReactNode;
  onAllUploaded: (bannerImagesData: {
    [key: string]: string | undefined;
  }) => void;
  layoutBannersOrintationData: {
    [key: string]: "Portrait" | "Landscape" | "Square";
  };
  initialBannersData: {
    [key: string]: string | undefined;
  };
}

export const UploadBannerImages: React.FC<UploadBannerImagesProps> = ({
  layoutBannersOrintationData,
  initialBannersData,
  onAllUploaded,
  children,
}) => {
  const initialBannersImagesData: {
    [key: string]: undefined | UploadedImageData;
  } = {};

  Object.keys(initialBannersData).map((bannerName) => {
    if (initialBannersData[bannerName] === undefined)
      initialBannersImagesData[bannerName] = undefined;
    else {
      initialBannersImagesData[bannerName] = {
        imageUrl: initialBannersData[bannerName]!,
        fromMediaCenter: true,
        id: bannerName,
        file: null,
      };
    }
  });

  const [bannersImagesData, setBannersImagesData] = useState(
    initialBannersImagesData,
  );

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true);
    const imagesToUpload: UploadedImageData[] = [];

    Object.keys(bannersImagesData).map((bannerName) => {
      if (bannersImagesData[bannerName] === undefined) return;

      if (!bannersImagesData[bannerName]!.fromMediaCenter)
        imagesToUpload.push(bannersImagesData[bannerName]!);
    });

    const imagesToBeUploadedFormData = new FormData();
    imagesToUpload.map((img, i) =>
      imagesToBeUploadedFormData.append(`file-${i}`, img.file),
    );

    if (imagesToUpload.length === 0) return prepareFinalDataAndUpdate();

    axios
      .post(
        "../../../api/mediaCenter/uploadToDrive",
        imagesToBeUploadedFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .then((res) => {
        prepareFinalDataAndUpdate(res);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const prepareFinalDataAndUpdate = (res?: any) => {
    let j = 0;
    const uploadedImagesLinks = res?.data?.imageUrls;
    const finalBannersImagesData: {
      [key: string]: string | undefined;
    } = {};

    Object.keys(bannersImagesData).map((bannerName) => {
      if (bannersImagesData[bannerName] === undefined)
        return (finalBannersImagesData[bannerName] = undefined);
      if (bannersImagesData[bannerName]!.fromMediaCenter)
        return (finalBannersImagesData[bannerName] =
          bannersImagesData[bannerName]?.imageUrl);
      if (!bannersImagesData[bannerName]!.fromMediaCenter) {
        finalBannersImagesData[bannerName] = uploadedImagesLinks[j];
        j++;
      }
    });

    onAllUploaded(finalBannersImagesData);
    setOpen(false);
  };

  return (
    <div>
      <DialogModel
        open={open}
        setOpen={setOpen}
        className="max-h-[80%] max-w-3xl overflow-y-auto scrollbar-none"
      >
        <DialogHeader>
          <DialogTitle>Upload Banner Images</DialogTitle>
        </DialogHeader>

        <div className="flex w-full justify-center">{children}</div>

        <div className="relative flex flex-col gap-6">
          {Object.keys(bannersImagesData).map((bannerImageKey, i) => (
            <UploadBannerImage
              key={i}
              bannerName={bannerImageKey}
              bannersImagesData={bannersImagesData}
              setBannersImagesData={setBannersImagesData}
              orientaion={layoutBannersOrintationData[bannerImageKey]}
              bannerImage={bannersImagesData[bannerImageKey]?.imageUrl}
            />
          ))}

          <div className="flex w-full justify-end gap-5">
            <DialogClose
              disabled={isLoading}
              className="rounded-md px-4 transition-colors hover:bg-slate-100"
            >
              Cancel
            </DialogClose>

            <LoadingButton
              isLoading={true}
              disabled={isLoading}
              onClick={onConfirm}
            >
              Confirm
            </LoadingButton>
          </div>
        </div>
      </DialogModel>

      <Button variant={"outline"} type="button" onClick={() => setOpen(true)}>
        Upload Images
      </Button>
    </div>
  );
};
