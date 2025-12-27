import { useEffect, useRef, useState } from "react";

import { FavIcon } from "@/shared/icons/Fav";
import { FavFillIcon } from "@/shared/icons/FavFill";
import { PauseIcon } from "@/shared/icons/Pause";
import { PlayIcon } from "@/shared/icons/Play";

import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { LOCAL_STORAGE_KEY, VOLUME_DEFAULT } from "@/shared/constants/volume";
import { AudioFile } from "@/types/player";
import { usePlayerContext } from "@/providers/PlayerContext";

export const File = ({ id, title, src, isLiked }: AudioFile) => {
  const {
    files,
    filesRefs,
    setFilesRefs,
    prevPlayingFile,
    setFiles,
    currentIndex,
    setCurrentIndex,
    setTime,
  } = usePlayerContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = (fileId: string) => {
    const cur = filesRefs[fileId];
    if (!cur) return;

    if (prevPlayingFile.current && cur !== prevPlayingFile.current) {
      prevPlayingFile.current.pause();
      prevPlayingFile.current.currentTime = 0;
    }

    setCurrentIndex(files.findIndex((file) => file.id === fileId));
    cur.play();
  };

  const handlePause = (fileId: string) => {
    const cur = filesRefs[fileId];
    if (!cur) return;

    cur.pause();
  };

  const toggleLiked = () => {
    setFiles((files) =>
      files.map((file) => {
        if (file.id === id) {
          return { ...file, isLiked: !file.isLiked };
        }

        return file;
      })
    );
  };

  const startNewTrack = () => {
    if (currentIndex < files.length - 1) {
      const newIndex = currentIndex + 1;
      handlePlay(files[newIndex].id);
    } else {
      handlePlay(files[0].id);
    }
  };

  if (filesRefs[id]) {
    filesRefs[id].volume = localStorage.getItem(LOCAL_STORAGE_KEY)
      ? Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / 100
      : VOLUME_DEFAULT;
  }

  useEffect(() => {
    if (!filesRefs || !audioRef || !audioRef.current) return;

    const audio = audioRef.current;
    setFilesRefs((prev) => ({ ...prev, [id]: audio }));

    return () => {
      if (filesRefs) {
        // filesRefs[id]?.pause();
        setFilesRefs((prev) => {
          const newItems = prev;
          delete newItems[id];
          return newItems;
        });
      }
    };
  }, []);

  // с задержкой небольшой меняется
  const isPlaying = filesRefs[id]?.duration > 0 && !filesRefs[id]?.paused;

  return (
    <div className="bg-slate-100 rounded p-4">
      <audio
        data-id={id}
        ref={audioRef}
        // controls
        src={src}
        onPlay={() => (prevPlayingFile.current = audioRef.current)}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadedData={() => {
          setIsLoading(false);
        }}
        onTimeUpdate={() => {
          setTime(filesRefs[id]?.currentTime);
        }}
        onEnded={startNewTrack}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex  gap-4">
          <Button
            variant="icon-filled"
            onClick={() => {
              if (isPlaying) handlePause(id);
              else handlePlay(id);
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button variant="icon" onClick={toggleLiked}>
            {isLiked ? <FavFillIcon /> : <FavIcon />}
          </Button>
          <Heading variant="h3">{title}</Heading>
        </div>
      )}
    </div>
  );
};
