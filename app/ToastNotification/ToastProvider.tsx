import { createPortal } from "react-dom";
import Toast from "./Toast";
import { useState } from "react";

export default function ToastProvider({
  isOpened,
  onClose,
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpened, setIsOpen] = useState(false);

  return createPortal(
    <Toast isOpened={isOpened} onClose={() => setIsOpen(false)}>
      Toast Notification
    </Toast>,
    document.getElementById("portal") as HTMLElement,
  );
}
