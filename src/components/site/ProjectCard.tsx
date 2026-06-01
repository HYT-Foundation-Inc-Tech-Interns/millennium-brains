import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";

type Project = {
  tag: string;
  title: string;
  location: string;
  category: string;
  images: string[];
};

const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 1.01,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.99,
  }),
};

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

export function ProjectCard({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);
  const imageCount = project.images.length;

  const cycleImage = (direction: number) => {
    directionRef.current = direction;
    setActiveIndex((current) => (current + direction + imageCount) % imageCount);
  };

  return (
    <motion.div className="card-surface overflow-hidden group">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${project.title}-${activeIndex}`}
            src={project.images[activeIndex]}
            alt={project.title}
            loading="lazy"
            custom={directionRef.current}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full aspect-[4/3] object-cover"
          />
        </AnimatePresence>

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-brand text-primary-foreground">
          {project.tag}
        </span>

        {imageCount > 1 ? (
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none opacity-0 translate-y-3 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            <div className="absolute inset-x-0 bottom-0 h-[50px] bg-black/50" />
            <div className="relative w-full px-4">
              <div className="h-[50px] flex justify-end items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => cycleImage(-1)}
                  className="pointer-events-auto inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/65 transition duration-300 ease-in-out hover:opacity-100 focus:outline-none"
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Previous image"
                >
                  <ArrowIcon direction="left" />
                </motion.button>

                <div className="h-[32px] w-px bg-white/65" />

                <motion.button
                  type="button"
                  onClick={() => cycleImage(1)}
                  className="pointer-events-auto inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/65 transition duration-300 ease-in-out hover:opacity-100 focus:outline-none"
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Next image"
                >
                  <ArrowIcon direction="right" />
                </motion.button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {project.location}
        </div>
      </div>
    </motion.div>
  );
}
