import React from "react";

import { Toaster } from "react-hot-toast";

export const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          maxWidth: "520px",
        },
      }}
    />
  );
};
