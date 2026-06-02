import { useEffect } from "react";
import { motion } from "framer-motion";

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (sessionStorage.getItem("introPlayed") !== "true") {
      sessionStorage.setItem("introPlayed", "true");
    }

    const timeoutId = window.setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 grid place-items-center text-white"
      style={{
        zIndex: 99999,
        background: "radial-gradient(circle at center, rgba(227, 227, 227, 0.08), transparent 24%), radial-gradient(circle at 30% 20%, rgba(227, 227, 227, 0.06), transparent 18%), black",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.92, filter: "blur(36px)", color: "#787878" }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.92, 1, 1, 12],
          filter: ["blur(36px)", "blur(0px)", "blur(0px)", "blur(48px)"],
          color: ["#787878", "#e3e3e3", "#e3e3e3", "#e3e3e3"],
        }}
        transition={{
          duration: 5,
          times: [0, 0.18, 0.82, 1],
          ease: ["easeOut", "linear", "easeInOut"],
        }}
        className="intro-overlay-text text-6xl md:text-7xl lg:text-[7.75rem] font-semibold leading-none tracking-[0.25em] uppercase text-center"
      >
        MILLENNIUM
      </motion.h1>
    </div>
  );
}
