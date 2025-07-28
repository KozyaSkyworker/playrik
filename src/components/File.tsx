import { RefObject } from "react";

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
  id: string;
}

interface Props extends AudioFile {
  filesRefs: RefObject<Record<string, HTMLAudioElement>>;
  currentPlayingFile: RefObject<string | null>;
  onPlayPause: (id: string) => void;
}

export const File = ({
  id,
  title,
  src,
  isPlaying,
  filesRefs,
  currentPlayingFile,
  onPlayPause,
}: Props) => {
  const handlePlayPause = () => {
    onPlayPause(id);
  };

  return (
    <div className="bg-gray-100 rounded p-4">
      <Heading variant="h3">{title}</Heading>
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
      />
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
        <Button variant="icon">
          <FavIcon />
        </Button>
        <Button variant="icon">
          <FavFillIcon />
        </Button>
        <Button variant="icon">
          <RepeatIcon />
        </Button>
        <Button variant="icon">
          <ShuffleIcon />
        </Button>
        <Button variant="icon">
          <MuteIcon />
        </Button>
        <Button variant="icon">
          <UnMuteIcon />
        </Button>
        <input type="range" />
        <div className="w-[333px] h-[5px] bg-teal-200">
          <div className="w-[150px] h-[5px] bg-teal-600" />
        </div>
      </div>
    </div>
  );
};
