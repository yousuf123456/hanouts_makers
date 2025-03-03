"use client";

import { editStorePageConfig } from "@/app/serverActions/storeEditor/editStorePageConfig";
import { InputHeading } from "@/app/_components/InputHeading";
import { routes } from "@/app/constants/routes";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import BackdropLoader from "@/app/sharedComponents/BackdropLoader";

interface StorePageCardProps {
  storePage: any;
}

export const StorePageCard: React.FC<StorePageCardProps> = ({ storePage }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [newName, setNewName] = useState("");

  interface Params {
    newName?: string;
    editName?: boolean;
    deletePage?: boolean;
    duplicatePage?: boolean;
  }

  const EditPageConfig = (params: Params) => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);

    setIsLoading(true);

    if (params.editName && !newName)
      return toast.error("Please type in the new name");

    if (params.deletePage && storePage.isPublished)
      return toast.error("Cannot delete the currently published page");

    editStorePageConfig({ ...params, pageId: storePage.id.$oid })
      .then((res) => {
        if (
          res === "Something goes wrong" ||
          res === "Unauthorized" ||
          res === "Vendor Data Not Found"
        )
          return toast.error(res);
        return toast.success(res);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="w-[640px] rounded-md border-[1px] border-slate-200 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-roboto text-lg font-semibold text-themeSecondary">
              {storePage.name}
            </h3>

            {storePage.isPublished && <Badge>Currently Published</Badge>}
          </div>

          <div className="flex items-center gap-12">
            <p className="font-roboto text-sm text-slate-600">
              Created At :{" "}
              {format(new Date(storePage.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </p>

            {storePage.publishedAt && (
              <p className="font-roboto text-sm text-slate-600">
                Published At :{" "}
                {format(new Date(storePage.publishedAt), "yyyy-MM-dd HH:mm:ss")}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-end gap-6">
            <Delete
              className="h-6 w-6 cursor-pointer text-red-500"
              onClick={() => setOpen1(true)}
            />

            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => setOpen2(true)}
            >
              Duplicate Page
            </Button>

            <Button size={"sm"} variant={"ghost"} onClick={() => setOpen(true)}>
              Edit Name
            </Button>

            <Link
              href={routes.storePagesPreview + `?pageId=${storePage.id.$oid}`}
            >
              <Button size={"sm"} className="bg-themeBlue hover:bg-blue-500">
                Preview
              </Button>
            </Link>

            <Link
              href={routes.storePagesEditor + `?pageId=${storePage.id.$oid}`}
            >
              <Button size={"sm"} className="flex gap-3">
                <Edit className="h-4 w-4 text-white" />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <DialogModel open={open} setOpen={setOpen}>
        <DialogHeader>
          <DialogTitle>Edit Name</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          <InputHeading>New Page Name</InputHeading>
          <Input
            value={newName}
            placeholder="Enter New Name"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={() => EditPageConfig({ editName: true, newName })}>
            Confirm
          </Button>
        </div>
      </DialogModel>

      <DialogModel open={open1} setOpen={setOpen1}>
        <DialogHeader>
          <DialogTitle>Delete Page</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this page ?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-4">
          <Button variant={"ghost"} onClick={() => setOpen1(false)}>
            Cancel
          </Button>

          <Button onClick={() => EditPageConfig({ deletePage: true })}>
            Confirm
          </Button>
        </div>
      </DialogModel>

      <DialogModel open={open2} setOpen={setOpen2}>
        <DialogHeader>
          <DialogTitle>Duplicate Page</DialogTitle>
          <DialogDescription>
            Are you sure you want to duplicate this page ?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-4">
          <Button variant={"ghost"} onClick={() => setOpen2(false)}>
            Cancel
          </Button>

          <Button onClick={() => EditPageConfig({ duplicatePage: true })}>
            Confirm
          </Button>
        </div>
      </DialogModel>
    </>
  );
};
