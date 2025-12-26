"use client";

import { usePlayerContext } from "@/providers/PlayerContext";
import { Heading } from "@/shared/ui/Heading";
import { File } from "./File";

export const Files = () => {
  const { files } = usePlayerContext();

  if (files.length < 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading variant="h2">Uploaded files</Heading>
      <div className="flex flex-col gap-10 pb-[200px]">
        {files.map((file) => (
          <File
            key={file.id}
            // currentPlayingFile={currentPlayingFile}
            // onPlayPause={handlePlayPause}
            // onLikedToggle={onLikedToggle}
            {...file}
          />
        ))}
      </div>
    </div>
  );
};
