import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface BackdropLoaderProps {
  open: boolean;
  backgroundColor?: string;
}

export default function BackdropLoader({
  open,
  backgroundColor,
}: BackdropLoaderProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 10000, backgroundColor: backgroundColor }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
