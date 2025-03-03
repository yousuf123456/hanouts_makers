import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./Droppable";
import { DynamicComponent } from "@/app/StorelayoutsComponents/DynamicComponent";
import { cn } from "@/lib/utils";
import { EditingLayoutData } from "./EditorForms";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EditStorePage } from "@/app/serverActions/storeEditor/editStorePage";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const StoreBanner = () => {
  return <p>Store Banner</p>;
};

interface PagePreviewProps {
  layout: any;
  pageId: string;
  isPagePublished: boolean;
  onDelete: (index: number) => void;
  onEdit: (layoutData: EditingLayoutData) => void;
}

export const PagePreview: React.FC<PagePreviewProps> = ({
  layout,
  onEdit,
  pageId,
  onDelete,
  isPagePublished,
}) => {
  const [tabs, setTabs] = useState("pc");
  const router = useRouter();

  const onPublish = () => {
    EditStorePage({ pageId: pageId, publishIt: true }).then((res) => {
      if (res === "Something goes wrong") return toast.error(res);
      if (res === "Unauthorised") return;
      if (res === "Vendor Data Not Found") return toast.error(res);

      toast.success(res);
      router.push("/store/pages");
    });
  };

  return (
    <div className="relative -top-16 flex w-full flex-col items-center gap-4">
      <div className="flex w-full justify-between">
        <Tabs value={tabs} onValueChange={(value) => setTabs(value)}>
          <TabsList>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="pc">PC</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
          {!isPagePublished ? (
            <Button className="font-roboto" onClick={onPublish}>
              Publish It
            </Button>
          ) : (
            <Badge>Page Currently Published</Badge>
          )}
          <Button
            className="bg-themeBlue font-roboto hover:bg-blue-500"
            onClick={() => router.push("/store/pages")}
          >
            Save
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col items-center gap-4",
          tabs === "pc" ? "w-full" : "w-[420px]",
        )}
      >
        <DynamicComponent
          componentName={layout[0].componentName}
          onEdit={() =>
            onEdit({
              formComponentName: layout[0].dataFormComponentName,
              componentName: layout[0].componentName,
              data: layout[0].data,
              name: layout[0].name,
            })
          }
          {...layout[0]}
        />

        <StrictModeDroppable droppableId="pageLayoutsList">
          {(provided) => (
            <div
              className="flex w-full flex-col items-center gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {layout.map((layoutComponent: any, i: number) => {
                if (i === 0) return null;
                return (
                  <Draggable
                    key={i}
                    index={i}
                    draggableId={`${layoutComponent.name}-${i}`}
                  >
                    {(provided) => (
                      <div className="h-full w-full @container">
                        <div
                          className={cn(
                            "h-full w-full",
                            layoutComponent.pcOnly && "hidden @sm:block ",
                            layoutComponent.mobileOnly && "@sm:hidden",
                          )}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <DynamicComponent
                            {...layoutComponent}
                            useContainerQueries={true}
                            onDelete={() =>
                              layoutComponent.movable && onDelete(i)
                            }
                            onEdit={() =>
                              layoutComponent.dataFormComponentName &&
                              onEdit({
                                componentName: layoutComponent.componentName,
                                formComponentName:
                                  layoutComponent.dataFormComponentName,
                                data: layoutComponent.data,
                                name: layoutComponent.name,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              <Draggable
                index={layout.length}
                draggableId="placeholderDropArea"
              >
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="h-12 w-full opacity-0"
                  />
                )}
              </Draggable>
              {
                //@ts-ignore
                provided.placeholder
              }
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </div>
  );
};
