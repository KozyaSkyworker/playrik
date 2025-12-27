"use client";

import { ReactNode, useMemo, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { AudioFile } from "@/types/player";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevPlayingFile = useRef<HTMLAudioElement | null>(null);

  const [filesRefs, setFilesRefs] = useState<Record<string, HTMLAudioElement>>(
    {}
  );

  const [time, setTime] = useState(0);

  const value = useMemo(
    () => ({
      files,
      setFiles,
      prevPlayingFile,
      filesRefs,
      setFilesRefs,
      currentIndex,
      setCurrentIndex,
      time,
      setTime,
    }),
    [currentIndex, files, filesRefs, time]
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
};
