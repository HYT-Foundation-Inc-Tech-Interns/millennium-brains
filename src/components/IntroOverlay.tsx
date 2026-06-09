import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Let the intro video play for a fixed 3s, then start the transition.
    // Driving it from a timer (rather than the video's own events) keeps the
    // timing consistent regardless of clip length, load errors, or autoplay.
    const timerId = window.setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.clearTimeout(timerId);
    };
  }, [onComplete]);

  return (
    <motion.div
      // Start at -25% so the black stop sits at 0%: the overlay is fully
      // opaque during playback (no center vignette). On exit the transparent
      // circle grows from the center out to the corners.
      initial={{ "--intro-reveal": "-25%", opacity: 1 }}
      exit={{ "--intro-reveal": "160%", opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 grid place-items-center"
      style={{
        zIndex: 99999,
        background: "black",
        // Transparent circle (with a 25% soft edge) dissolves the overlay from
        // the middle to the corners to reveal the page beneath.
        WebkitMaskImage:
          "radial-gradient(circle at center, transparent var(--intro-reveal), black calc(var(--intro-reveal) + 25%))",
        maskImage:
          "radial-gradient(circle at center, transparent var(--intro-reveal), black calc(var(--intro-reveal) + 25%))",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        // Scales per device: larger share of the screen on phones, smaller on
        // bigger displays. object-contain keeps the full frame (no cropping).
        className="h-auto w-[78%] object-contain sm:w-[60%] md:w-[45%] lg:w-[60%] xl:w-[60%]"
      >
        <source src="/videos/millenium-intro.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
