import React, { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryType } from "@/app/types";
import axios from "axios";
import { HiChevronRight } from "react-icons/hi";
import { find } from "lodash";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import { Loading } from "./Loading";

interface CategorySelectorProps {
  selectedCategoryData: CategoryType[];
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setSelectedCategoryData: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  register,
  setValue,
  selectedCategoryData,
  setSelectedCategoryData,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categorySets, setCategorySets] = useState<CategoryType[][]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("../../../../api/getCategories", {})
      .then((res) => setCategorySets((prev) => [res.data]))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const selectCategory = (category: CategoryType, categorySetIndex: number) => {
    if (categorySetIndex !== categorySets.length - 1) {
      let newSelectedCategoryData = [...selectedCategoryData];
      newSelectedCategoryData[categorySetIndex] = category;
      newSelectedCategoryData = newSelectedCategoryData.filter(
        (_, i) => i <= categorySetIndex
      );

      return setSelectedCategoryData(newSelectedCategoryData);
    }

    setSelectedCategoryData((prev) => [...prev, category]);
  };

  useEffect(() => {
    if (!(selectedCategoryData.length > 0)) return;
    if (!selectedCategoryData[selectedCategoryData.length - 1].hasChilds)
      return;

    const parentId =
      selectedCategoryData[selectedCategoryData.length - 1]._id.$oid;

    setIsLoading(true);
    axios
      .post("../../../../api/getCategories", { getChilds: true, parentId })
      .then((res) => {
        let newCategorySets = [...categorySets];
        newCategorySets[selectedCategoryData.length] = res.data;
        newCategorySets = newCategorySets.filter(
          (_, i) => i <= selectedCategoryData.length
        );

        setCategorySets(newCategorySets);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [selectedCategoryData]);

  const isSelected = (name: string) => {
    return !!find(selectedCategoryData, { name: name });
  };

  const onSelectCategory = () => {
    const categoryNamesArray = selectedCategoryData.map(
      (category) => category.name
    );
    const categoryString = categoryNamesArray.join(" / ");
    setValue("categoryString", categoryString);
    setOpen(false);
  };

  return (
    <div>
      <TextInput
        id="categoryString"
        heading="Category"
        register={register}
        onClick={() => setOpen(true)}
        required
      />

      <DialogModel className="min-w-[860px]" open={open} setOpen={setOpen}>
        <div className="relative">
          <DialogHeader>
            <DialogTitle>Select Category</DialogTitle>
          </DialogHeader>

          {isLoading && (
            <div className="w-full h-full z-[99999] absolute flex justify-center items-center">
              <Loading />
            </div>
          )}

          {categorySets.length > 0 && (
            <div className="mt-6 flex flex-col gap-6">
              <div className="flex gap-0 border-[1px] border-slate-300 rounded-md overflow-hidden">
                {categorySets.map((categorySet, i) => (
                  <div className="flex flex-col w-48 gap-0 border-r-[1px] border-slate-400">
                    {categorySet.map((category) => (
                      <div
                        onClick={() => selectCategory(category, i)}
                        className={cn(
                          "p-2 relative group hover:bg-blue-50 flex justify-between items-center",
                          isSelected(category.name) && "bg-blue-50"
                        )}
                      >
                        <p className="text-sm text-black line-clamp-1">
                          {category.name}
                        </p>

                        {category.hasChilds && (
                          <HiChevronRight className="w-4 h-4" />
                        )}

                        <div
                          className={cn(
                            "rounded-r-md h-6 w-1 opacity-0 group-hover:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 bg-themeBlue",
                            isSelected(category.name) && "opacity-100"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  color="secondary"
                  onClick={onSelectCategory}
                  disabled={
                    selectedCategoryData.length === 0 ||
                    selectedCategoryData[selectedCategoryData.length - 1]
                      ?.hasChilds
                  }
                >
                  Done
                </Button>

                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogModel>
    </div>
  );
};
