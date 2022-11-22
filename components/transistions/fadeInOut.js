import { Transition } from "@headlessui/react";
import { useEffect } from "react";

export default function FadeInOut({ open, setOpen, children }) {
  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, [setOpen]);
  return (
    <Transition
      show={open}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
