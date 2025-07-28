import { RefObject, useState } from "react";

import { FavIcon } from "@/shared/icons/Fav";
import { FavFillIcon } from "@/shared/icons/FavFill";
import { MuteIcon } from "@/shared/icons/Mute";
import { NextIcon } from "@/shared/icons/Next";
import { PauseIcon } from "@/shared/icons/Pause";
import { PlayIcon } from "@/shared/icons/Play";
import { PrevIcon } from "@/shared/icons/Prev";
import { RepeatIcon } from "@/shared/icons/Repeat";
import { ShuffleIcon } from "@/shared/icons/Shuffle";
import { UnMuteIcon } from "@/shared/icons/UnMute";

import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";

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

  const toggleMuted = () => {
    setIsMuted((prev) => {
      const newMutedVal = !prev;
      filesRefs.current[id].volume = newMutedVal ? 0.0 : 1.0;
      return newMutedVal;
    });
  };

  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          setTime(
            (filesRefs.current[id]?.currentTime /
              filesRefs.current[id]?.duration) *
              100
          );
        }}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-4">
          <Heading variant="h3">{title}</Heading>
          <div>
            <div className="w-full h-[5px] bg-teal-200 rounded">
              <div
                className="h-[5px] bg-teal-600 rounded"
                style={{ width: `${Math.round(time)}%` }}
              />
            </div>
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
            <Button variant="icon" onClick={toggleMuted}>
              {isMuted ? <MuteIcon /> : <UnMuteIcon />}
            </Button>
            <input type="range" />
          </div>
        </div>
      )}
    </div>
  );
};
