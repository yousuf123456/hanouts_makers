"use client";

import React, { useState, createContext, useEffect } from "react";
import { LayoutsToSelect } from "./LayoutsToSelect";

import {
  FolderStructureType,
  LayoutComponentType,
  MediaCenterImagesType,
  StoreLayoutsType,
} from "@/app/types";

import { PagePreview } from "./PagePreview";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { LayoutsListSheet } from "./LayoutsListSheet";
import { DynamicLayoutEditForm } from "@/app/StorelayoutsComponents/forms/DynamicLayoutEditForm";
import { FieldValues } from "react-hook-form";
import BackdropLoader from "@/app/sharedComponents/BackdropLoader";
import { EditStorePage } from "@/app/serverActions/storeEditor/editStorePage";
import toast from "react-hot-toast";

export interface EditingLayoutData {
  name: string;
  componentName: string;
  formComponentName: string;
  data: { [key: string]: any };
}

interface EditorFormsProps {
  pageId: string;
  rootFolderId: string;
  isPagePublished: boolean;
  layouts: StoreLayoutsType;
  mediaCenterImages: MediaCenterImagesType;
  initialPageLayoutsList: LayoutComponentType[];
  mediaCenterfolderStructure: FolderStructureType[];
}

export const MediaCenterContext = createContext<{
  mediaCenterfolderStructure: FolderStructureType[];
  mediaCenterImages: MediaCenterImagesType;
  rootFolderId: string;
}>({} as any);

export const EditorForms: React.FC<EditorFormsProps> = ({
  mediaCenterfolderStructure,
  initialPageLayoutsList,
  mediaCenterImages,
  isPagePublished,
  rootFolderId,
  layouts,
  pageId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [editingLayoutData, setEditingLayoutData] = useState<
    EditingLayoutData | undefined
  >();

  const [selectedLayoutCat, setSelectedLayoutCat] = useState<
    "banner" | undefined | "product" | "promotion"
  >();

  const [pageLayoutsList, setPageLayoutsList] = useState<LayoutComponentType[]>(
    initialPageLayoutsList || [
      {
        dataFormComponentName: "BannersForm",
        componentName: "StoreBanner",
        name: "Store Banner",
        mobileOnly: false,
        pcOnly: false,
        movable: false,
        data: {},
      },
      {
        dataFormComponentName: "",
        componentName: "JustForYou",
        name: "Just For You",
        mobileOnly: false,
        movable: false,
        pcOnly: false,
        data: {},
      },
    ],
  );

  const UpdateStorePages = (newPageLayouts: LayoutComponentType[]) => {
    // setIsLoading(true);

    // EditStorePage({ pageId, newPageLayouts })
    //   .then((res) => {
    //     if (res === "Something goes wrong") return toast.error(res);
    //     if (res === "Vendor Data Not Found") return toast.error(res);
    //     if (res === "Unauthorised") return;
    //   })
    //   .finally(() => setIsLoading(false));
    setPageLayoutsList(newPageLayouts);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === "layoutsList" &&
      destination.droppableId === "pageLayoutsList"
    ) {
      const layoutKeys = Object.keys(layouts[selectedLayoutCat || "banner"]);
      const selectedLayout =
        layouts[selectedLayoutCat || "banner"][layoutKeys[source.index]];

      const newPageLayouts = [...pageLayoutsList];
      //Adding +1 to the destination index bcz the storeBanner at index 0 is not in draggable list
      newPageLayouts.splice(destination.index, 0, selectedLayout);

      UpdateStorePages(newPageLayouts);
    }

    if (
      source.droppableId === "pageLayoutsList" &&
      destination.droppableId === "pageLayoutsList"
    ) {
      const newPageLayouts = () => {
        let newArray = [...pageLayoutsList];
        let temp = newArray[source.index];
        newArray[source.index] = newArray[destination.index];
        newArray[destination.index] = temp;

        return newArray;
      };

      UpdateStorePages(newPageLayouts());
    }

    if (
      source.droppableId === "layoutsList" &&
      destination.droppableId === "layoutsList"
    ) {
      return;
    }
  };

  const onDelete = (index: number) => {
    const newPageLayouts = [...pageLayoutsList];
    newPageLayouts.splice(index, 1);

    UpdateStorePages(newPageLayouts);
  };

  const onEdit = (layoutData: EditingLayoutData) => {
    setOpen1(true);
    setEditingLayoutData(layoutData);
  };

  const mediaCenterData = {
    mediaCenterfolderStructure,
    mediaCenterImages,
    rootFolderId,
  };

  const onEditLayoutFormSubmit = (componentName: string, data: FieldValues) => {
    setOpen1(false);

    const newPageLayouts = pageLayoutsList.map((layoutComponent) => {
      if (layoutComponent.componentName === componentName) {
        return { ...layoutComponent, data };
      } else return layoutComponent;
    });

    UpdateStorePages(newPageLayouts);
  };

  return (
    <>
      <BackdropLoader open={isLoading} />

      <div className="flex items-start gap-16">
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <LayoutsToSelect
              setSelectedLayoutCat={setSelectedLayoutCat}
              setOpen={setOpen}
            />

            <LayoutsListSheet
              open={open}
              setOpen={setOpen}
              initialLayouts={layouts}
              selectedLayoutCat={selectedLayoutCat}
            />
          </div>

          <div className="w-full">
            <PagePreview
              onEdit={onEdit}
              pageId={pageId}
              onDelete={onDelete}
              layout={pageLayoutsList}
              isPagePublished={isPagePublished}
            />

            <MediaCenterContext.Provider value={mediaCenterData}>
              <DynamicLayoutEditForm
                open={open1}
                setOpen={setOpen1}
                editingLayoutData={editingLayoutData}
                onEditLayoutFormSubmit={onEditLayoutFormSubmit}
              />
            </MediaCenterContext.Provider>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
