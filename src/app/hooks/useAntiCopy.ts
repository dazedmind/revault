import { useEffect } from "react";
import { toast } from "sonner";

export default function useAntiCopy() {
  useEffect(() => {
    const smessage = "Content is protected!";
    const showMessage = (msg: string) => alert(msg);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    const isContentEditable = (e: Event) => {
      const target = e.target as HTMLElement;
      return (
        target.isContentEditable ||
        target.getAttribute("contenteditable") === "true" ||
        target.parentElement?.isContentEditable
      );
    };

    const disableKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      const isTextInput = ["TEXT", "TEXTAREA", "INPUT", "PASSWORD", "SELECT", "OPTION", "EMBED"].includes(tag);

      if (!isTextInput && e.ctrlKey) {
        const key = e.key.toLowerCase();
        if (["a", "c", "x", "v", "u", "s", "i", "j"].includes(key)) {
          if (!isContentEditable(e)) {
            // showMessage("You are not allowed to copy content or view source.");
            toast.error("You are not allowed to copy content or view source.");
            e.preventDefault();
          }
        }
      }

      // F12
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()))) {
        e.preventDefault();
        toast.error("Developer Tools are disabled.");
      }
    };

    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // showMessage("Context menu disabled!");
      toast.error("Context menu disabled!");
    };

    const disableCopy = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      const isTextInput = ["TEXT", "TEXTAREA", "INPUT", "PASSWORD", "SELECT", "OPTION", "EMBED"].includes(tag);
      if (!isTextInput && !isContentEditable(e)) {
        if (!isSafari) {
          showMessage(smessage);
          e.preventDefault();
        }
      }
    };

    const disableSelection = () => {
      const body = document.body;
      body.style.userSelect = "none";
    };

    // Detect DevTools open
    const devToolsDetect = () => {
      const threshold = 160;
      let check = setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > threshold) {
          toast.error("Developer tools are disabled on this page.");
          window.location.reload(); // or window.close();
        }
      }, 1000);
      return () => clearInterval(check);
    };

    // Touch long-press
    let timer: NodeJS.Timeout | null = null;
    const touchDuration = 1000;
    const onLongTouch = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) selection.removeAllRanges();
    };
    const onTouchStart = () => {
      if (!timer) timer = setTimeout(onLongTouch, touchDuration);
    };
    const onTouchEnd = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };

    // Add listeners
    document.addEventListener("keydown", disableKey);
    document.addEventListener("contextmenu", disableContextMenu);
    // document.addEventListener("mousedown", disableCopy);
    document.addEventListener("selectstart", e => e.preventDefault());
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    disableSelection();
    const stopDevTools = devToolsDetect();

    return () => {
      document.removeEventListener("keydown", disableKey);
      document.removeEventListener("contextmenu", disableContextMenu);
      // document.removeEventListener("mousedown", disableCopy);
      document.removeEventListener("selectstart", e => e.preventDefault());
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      stopDevTools();
    };
  }, []);
}
