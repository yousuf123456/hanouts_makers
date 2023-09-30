"use client";

import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import Link from "next/link";

export function ProductListActions({ productId }: { productId: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <HiMiniEllipsisHorizontal
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-black hover:opacity-60 cursor-pointer"
      />
      <Menu
        disableScrollLock
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href={`/products/${productId}`}>
          <MenuItem onClick={handleClose}>Details / Edit Product</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
