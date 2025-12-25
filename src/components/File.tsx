import { RefObject, useState } from "react";

import { FavIcon } from "@/shared/icons/Fav";
import { FavFillIcon } from "@/shared/icons/FavFill";
import { NextIcon } from "@/shared/icons/Next";
import { PauseIcon } from "@/shared/icons/Pause";
import { PlayIcon } from "@/shared/icons/Play";
import { PrevIcon } from "@/shared/icons/Prev";
import { RepeatIcon } from "@/shared/icons/Repeat";
import { ShuffleIcon } from "@/shared/icons/Shuffle";

import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { getFormatedTime } from "@/shared/utils/getFormatedTime";
import { LOCAL_STORAGE_KEY, VOLUME_DEFAULT } from "@/shared/constants/volume";

export interface AudioFile {
  src: string;
  title: string;
  isPlaying: boolean;
  isLiked: boolean;
  id: string;
}

interface Props extends AudioFile {
  filesRefs: RefObject<Record<string, HTMLAudioElement>>;
  currentPlayingFile: RefObject<string | null>;
  onPlayPause: (id: string) => void;
  onLikedToggle: (id: string) => void;
}

export const File = ({
  id,
  title,
  src,
  isPlaying,
  isLiked,
  filesRefs,
  currentPlayingFile,
  onPlayPause,
  onLikedToggle,
}: Props) => {
  const handlePlayPause = () => {
    onPlayPause(id);
  };

  const toggleLiked = () => {
    onLikedToggle(id);
  };

  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  if (filesRefs.current[id]) {
    filesRefs.current[id].volume = localStorage.getItem(LOCAL_STORAGE_KEY)
      ? Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / 100
      : VOLUME_DEFAULT;
  }

  return (
    <div className="bg-slate-100 rounded p-4">
      <audio
        data-id={id}
        ref={(ref) => {
          if (!filesRefs.current || !ref) return;

          filesRefs.current[id] = ref;

          return () => {
            if (filesRefs.current) {
              delete filesRefs.current[id];
            }
          };
        }}
        controls
        src={src}
        onPlay={() => (currentPlayingFile.current = id)}
        onPause={() => {
          if (currentPlayingFile.current === id) {
            currentPlayingFile.current = null;
          }
        }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadedData={() => {
          setIsLoading(false);
        }}
        onTimeUpdate={() => {
          setTime(filesRefs.current[id]?.currentTime);
        }}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-4">
          <Heading variant="h3">{title}</Heading>
          <div>
            <div className="flex gap-4">
              <span>{getFormatedTime(filesRefs.current[id]?.currentTime)}</span>
              <span>{getFormatedTime(filesRefs.current[id]?.duration)}</span>
            </div>
            <input
              className="w-full h-[5px]  bg-teal-600 rounded"
              type="range"
              min={0}
              max={filesRefs.current[id]?.duration}
              value={time}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setTime(newTime);
                filesRefs.current[id].currentTime = newTime;
              }}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="icon-filled">
              <PrevIcon />
            </Button>
            <Button variant="icon-filled" onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
            <Button variant="icon-filled">
              <NextIcon />
            </Button>
            <Button variant="icon" onClick={toggleLiked}>
              {isLiked ? <FavFillIcon /> : <FavIcon />}
            </Button>
            <Button variant="icon">
              <RepeatIcon />
            </Button>
            <Button variant="icon">
              <ShuffleIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
