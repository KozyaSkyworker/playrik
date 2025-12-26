"use client";

import { RefObject, useState } from "react";

import { MuteIcon } from "@/shared/icons/Mute";
import { UnMuteIcon } from "@/shared/icons/UnMute";

import { Button } from "@/shared/ui/Button";
import { LOCAL_STORAGE_KEY, VOLUME_DEFAULT } from "@/shared/constants/volume";
import { PrevIcon } from "@/shared/icons/Prev";
import { NextIcon } from "@/shared/icons/Next";
import { RepeatIcon } from "@/shared/icons/Repeat";
import { ShuffleIcon } from "@/shared/icons/Shuffle";
import { PlayIcon } from "@/shared/icons/Play";
import { getFormatedTime } from "@/shared/utils/getFormatedTime";
import { Heading } from "@/shared/ui/Heading";
import { usePlayerContext } from "@/providers/PlayerContext";
import { PauseIcon } from "@/shared/icons/Pause";
import { FavIcon } from "@/shared/icons/Fav";
import { FavFillIcon } from "@/shared/icons/FavFill";

export const ControlsPanel = () => {
  const { files, currentFile, filesRefs } = usePlayerContext();

  const [isMuted, setIsMuted] = useState(false);
  const [localVolume, setLocalVolume] = useState(
    (typeof window !== "undefined" &&
      Number(localStorage.getItem(LOCAL_STORAGE_KEY))) ||
      VOLUME_DEFAULT
  );

  const [time, setTime] = useState(0);

  const toggleMuted = () => {
    setIsMuted((m) => !m);
  };

  const muted = isMuted || localVolume === 0;

  if (files.length < 1) {
    return null;
  }

  const { id, isLiked, isPlaying, src, title } = currentFile || files[0];

  const handlePlayPause = () => {
    const audioElement = filesRefs[id];
    if (!audioElement) return;

    audioElement.play();
  };

  return (
    <div className="fixed bottom-0 bg-slate-300 w-[1200px] h-max p-4 rounded-t">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
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
            {isLiked ? <FavFillIcon /> : <FavIcon />}
          </Button>
          <Button variant="icon">
            <RepeatIcon />
          </Button>
          <Button variant="icon">
            <ShuffleIcon />
          </Button>
        </div>

        <div className="flex flex-col gap-1 grow">
          <Heading variant="h3">{title}</Heading>
          <div className="flex items-center justify-between">
            <span>123</span>
            <span>321</span>
          </div>
          <input
            className="w-full h-[5px]  bg-teal-600 rounded"
            type="range"
            min={0}
            // max={filesRefs.current[id]?.duration}
            max={123}
            value={time}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              // setTime(newTime);
              // filesRefs.current[id].currentTime = newTime;
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            value={localVolume}
            min={0}
            max={100}
            onChange={(e) => {
              const newValue = e.target.value;
              localStorage.setItem(LOCAL_STORAGE_KEY, newValue);
              setLocalVolume(Number(newValue));
            }}
          />
          <Button variant="icon" onClick={toggleMuted}>
            {muted ? <MuteIcon /> : <UnMuteIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
};
