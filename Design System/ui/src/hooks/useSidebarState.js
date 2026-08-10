import { useState } from "react";

export function useSidebarState(initial = true) {
  const [isOpen, setIsOpen] = useState(initial);
  return { isOpen, setIsOpen };
}
