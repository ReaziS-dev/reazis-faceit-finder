"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import "./style.scss";

interface ToastProps {
  isOpened?: boolean;
  onClose?: () => void;
}

export default function Home({
  children,
  isOpened,
  onClose,
}: PropsWithChildren<ToastProps>) {
  useEffect(() => {
    console.log("Toast opened");
    if (isOpened) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  return (
    <div className={`toast-wrapper ${isOpened ? "opened" : ""}`}>
      <h2>{children}</h2>
    </div>
  );
}
