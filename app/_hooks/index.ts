import { useState } from "react";

export const usePending = () => {
  const [isPending, setIsPending] = useState(false);

  function startAction() {
    setIsPending(true);
  }
  function endAction() {
    setIsPending(false);
  }

  return { startAction, endAction, isPending };
};
