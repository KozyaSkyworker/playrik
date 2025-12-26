"use client";

import { ReactNode, useMemo, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { AudioFile } from "@/types/player";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [currentFile, setCurrentFile] = useState<AudioFile | null>(null);

  const [filesRefs, setFilesRefs] = useState<Record<string, HTMLAudioElement>>(
    {}
  );

  const value = useMemo(
    () => ({
      files,
      setFiles,
      currentFile,
      setCurrentFile,
      filesRefs,
      setFilesRefs,
    }),
    [currentFile, files, filesRefs]
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
};
