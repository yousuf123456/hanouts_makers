"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { InputHeading } from "@/app/_components/InputHeading";
import { TextInput } from "@/app/_components/TextInput";

import { editStorePageConfig } from "@/app/serverActions/storeEditor/editStorePageConfig";
import toast from "react-hot-toast";
import BackdropLoader from "@/app/sharedComponents/BackdropLoader";

export const CreatePage = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { name: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    editStorePageConfig({ pageName: data.name, createPage: true })
      .then((res) => {
        if (res === "Something goes wrong") return toast.error(res);
        if (res === "Unauthorized") return;
        if (res === "Vendor Data Not Found") return toast.error(res);

        setOpen(false);
        toast.success(res);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-themeBlue hover:bg-blue-500" size={"lg"}>
            Create New Page
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="flex flex-col gap-0">
                <InputHeading required>Name</InputHeading>
                <TextInput
                  id="name"
                  required
                  register={register}
                  placeholder="Enter Page Name"
                />
              </div>

              <div className="flex w-full justify-end gap-5">
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  type="button"
                  size={"sm"}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-themeBlue hover:bg-blue-500"
                  type="submit"
                  size={"sm"}
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
