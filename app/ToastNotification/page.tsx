"use client";

import { createPortal } from "react-dom";
import ToastProvider from "./ToastProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [isOpened, setIsOpen] = useState(false);

  useEffect(() => {
    setPortalElement(document.getElementById("portal") as HTMLElement);
  }, [portalElement]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show Toast</button>
      {portalElement &&
        createPortal(
          <ToastProvider>Toast Notification</ToastProvider>,
          portalElement,
        )}
    </>
  );
}
