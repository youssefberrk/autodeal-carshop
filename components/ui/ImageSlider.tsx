"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface ImageSliderProps {
  album: string[];
  activeImage?: number;
  onImageChange?: (index: number) => void;
}

const ImageSlider = ({
  album,
  activeImage = 0,
  onImageChange,
}: ImageSliderProps) => {
  const [internalIndex, setInternalIndex] = useState<number>(activeImage);

  useEffect(() => {
    setInternalIndex(activeImage);
  }, [activeImage]);

  const currentIndex = onImageChange ? activeImage : internalIndex;

  const moveToImage = useCallback(
    (nextIndex: number) => {
      const boundedIndex = (nextIndex + album.length) % album.length;
      setInternalIndex(boundedIndex);
      onImageChange?.(boundedIndex);
    },
    [album.length, onImageChange],
  );

  const nextImg = useCallback(() => {
    if (album.length <= 1) return;
    moveToImage(currentIndex + 1);
  }, [album.length, currentIndex, moveToImage]);

  const prevImg = useCallback(() => {
    if (album.length <= 1) return;
    moveToImage(currentIndex - 1);
  }, [album.length, currentIndex, moveToImage]);

  if (!album || album.length === 0) return null;

  return (
    <div className="relative h-full w-full overflow-hidden group">
      <motion.div
        className="flex h-full w-full"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.5 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_event, { offset, velocity }) => {
          const swipeThreshold = 50;
          if (offset.x < -swipeThreshold || velocity.x < -500) {
            nextImg();
          } else if (offset.x > swipeThreshold || velocity.x > 500) {
            prevImg();
          }
        }}
      >
        {album.map((photo, i) => (
          <div key={`${photo}-${i}`} className="relative h-full w-full shrink-0">
            <Image
              src={photo}
              alt="car"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              loading="eager"
              priority={i === currentIndex}
              unoptimized={photo.startsWith("http")}
            />
          </div>
        ))}
      </motion.div>

      {album.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100">
            {album.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  moveToImage(i);
                }}
                className="cursor-pointer transition-transform active:scale-75"
              >
                {i === currentIndex ? (
                  <CircleDot
                    strokeWidth={3}
                    size={17}
                    className="text-white drop-shadow-md"
                  />
                ) : (
                  <Circle
                    strokeWidth={3}
                    size={8}
                    className="text-white/60 drop-shadow-md transition-colors hover:text-white"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
            className="absolute left-0 top-0 z-20 h-full bg-black/10 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/20 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImg();
            }}
            className="absolute right-0 top-0 z-20 h-full bg-black/10 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/20 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
