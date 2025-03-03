"use client";
import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

export const BeutifullDNDContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <DragDropContext>{children}</DragDropContext>;
};
