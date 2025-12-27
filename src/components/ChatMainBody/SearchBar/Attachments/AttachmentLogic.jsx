import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "../../../../lib/utils";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

const PopoverContext = createContext();

function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

function usePopoverLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return { isOpen, openPopover, closePopover, note, setNote };
}

export function PopoverRoot({ children, className }) {
  const popoverLogic = usePopoverLogic();

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div
          className={cn(
            "relative flex items-center justify-center isolate",
            className
          )}
        >
          {children}
        </div>
      </MotionConfig>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, className }) {
  const { openPopover } = usePopover();

  return (
    <motion.button
      key="button"
      className={cn(
        "flex w-10 h-10 justify-center items-center border border-gray-950/10 bg-white px-3 text-gray-950 dark:border-gray-50/10 dark:bg-gray-600 dark:text-gray-50 rounded-full",
        className
      )}
      //   style={{ borderRadius: 8 }}
      onClick={openPopover}
    >
      <motion.span className="text-sm">{children}</motion.span>
    </motion.button>
  );
}

export function PopoverContent({ children, className }) {
  const { isOpen, closePopover } = usePopover();
  const formContainerRef = useRef(null);

  useClickOutside(formContainerRef, closePopover);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={formContainerRef}
          className={cn(
            "absolute bottom-12 h-[200px] -left-4 w-[364px] overflow-hidden border border-gray-950/10 bg-white outline-none dark:bg-gray-700 z-50",
            className
          )}
          style={{ borderRadius: 12 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PopoverForm({ children, onSubmit, className }) {
  const { note, closePopover } = usePopover();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(note);
    closePopover();
  };

  return (
    <form
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export function PopoverLabel({ children, className }) {
  const { note } = usePopover();

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity: note ? 0 : 1 }}
      className={cn(
        "absolute left-4 top-3 select-none text-sm text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

export function PopoverTextarea({ className }) {
  const { note, setNote } = usePopover();

  return (
    <textarea
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}

export function PopoverFooter({ children, className }) {
  return (
    <div className={cn("flex justify-between px-4 py-3", className)}>
      {children}
    </div>
  );
}

export function PopoverCloseButton({ className }) {
  const { closePopover } = usePopover();

  return (
    <button
      type="button"
      className={cn("flex items-center", className)}
      onClick={closePopover}
      aria-label="Close popover"
    >
      Logo {/* <X size={16} className="text-gray-900 dark:text-gray-100" /> */}
    </button>
  );
}

export function PopoverSubmitButton({ className }) {
  return (
    <button
      className={cn(
        "relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-gray-950/10 bg-transparent px-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:ring-2 active:scale-[0.98] dark:border-gray-50/10 dark:text-gray-50 dark:hover:bg-gray-800",
        className
      )}
      type="submit"
      aria-label="Submit note"
    >
      Submit
    </button>
  );
}

export function PopoverHeader({ children, className }) {
  return (
    <div
      className={cn(
        "px-4 py-2 font-semibold text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PopoverBody({ children, className }) {
  return <div className={cn("p-2", className)}>{children}</div>;
}

export function PopoverButton({ children, onClick, className }) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
