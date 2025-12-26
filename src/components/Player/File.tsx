import { RefObject, useEffect, useRef, useState } from "react";

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
import { AudioFile } from "@/types/player";
import { usePlayerContext } from "@/providers/PlayerContext";

interface Props extends AudioFile {
  // currentPlayingFile: RefObject<string | null>;
  // onPlayPause: (id: string) => void;
  // onLikedToggle: (id: string) => void;
}

export const File = ({
  id,
  title,
  src,
  isPlaying,
  isLiked,
}: // filesRefs,
// currentPlayingFile,
// onPlayPause,
// onLikedToggle,
Props) => {
  const { filesRefs, setFilesRefs } = usePlayerContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPause = () => {
    // onPlayPause(id);
  };

  const toggleLiked = () => {
    // onLikedToggle(id);
  };

  // if (filesRefs.current[id]) {
  //   filesRefs.current[id].volume = localStorage.getItem(LOCAL_STORAGE_KEY)
  //     ? Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / 100
  //     : VOLUME_DEFAULT;
  // }

  useEffect(() => {
    if (!filesRefs || !audioRef || !audioRef.current) return;

    const audio = audioRef.current;
    setFilesRefs((prev) => ({ ...prev, [id]: audio }));

    return () => {
      if (filesRefs) {
        setFilesRefs((prev) => {
          const newItems = prev;
          delete newItems[id];
          return newItems;
        });
      }
    };
  }, []);

  console.log(filesRefs);

  return (
    <div className="bg-slate-100 rounded p-4">
      <audio
        data-id={id}
        ref={audioRef}
        controls
        src={src}
        // onPlay={() => (currentPlayingFile.current = id)}
        // onPause={() => {
        //   if (currentPlayingFile.current === id) {
        //     currentPlayingFile.current = null;
        //   }
        // }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadedData={() => {
          setIsLoading(false);
        }}
        // onTimeUpdate={() => {
        //   setTime(filesRefs.current[id]?.currentTime);
        // }}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-4">
          <Heading variant="h3">{title}</Heading>
          <div>
            <div className="flex gap-4">
              <span>{getFormatedTime(filesRefs[id]?.currentTime)}</span>
              <span>{getFormatedTime(filesRefs[id]?.duration)}</span>
            </div>
            <input
              className="w-full h-[5px]  bg-teal-600 rounded"
              type="range"
              min={0}
              // max={filesRefs.current[id]?.duration}
              value={time}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setTime(newTime);
                // filesRefs.current[id].currentTime = newTime;
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
