"use client";

import { useState } from "react";

import { MuteIcon } from "@/shared/icons/Mute";
import { UnMuteIcon } from "@/shared/icons/UnMute";

import { Button } from "@/shared/ui/Button";
import { LOCAL_STORAGE_KEY, VOLUME_DEFAULT } from "@/shared/constants/volume";
import { PrevIcon } from "@/shared/icons/Prev";
import { NextIcon } from "@/shared/icons/Next";
import { RepeatIcon } from "@/shared/icons/Repeat";
import { ShuffleIcon } from "@/shared/icons/Shuffle";
import { PlayIcon } from "@/shared/icons/Play";

export const ControlsPanel = () => {
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

  return (
    <div className="fixed bottom-0 bg-red-400 w-[1200px] h-max p-4 rounded-t">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <span>1</span>
          <div className="flex gap-3">
            <Button variant="icon-filled">
              <PrevIcon />
            </Button>
            <Button variant="icon-filled">
              {/* {isPlaying ? <PauseIcon /> : <PlayIcon />} */}
              <PlayIcon />
            </Button>
            <Button variant="icon-filled">
              <NextIcon />
            </Button>
            <Button variant="icon">
              {/* {isLiked ? <FavFillIcon /> : <FavIcon />} */}
              fav
            </Button>
            <Button variant="icon">
              <RepeatIcon />
            </Button>
            <Button variant="icon">
              <ShuffleIcon />
            </Button>

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
          <span>22</span>
        </div>
        <input
          className="w-full h-[5px]  bg-teal-600 rounded"
          type="range"
          min={0}
          // max={filesRefs.current[id]?.duration}
          max={123}
          // value={time}
          onChange={(e) => {
            const newTime = Number(e.target.value);
            // setTime(newTime);
            // filesRefs.current[id].currentTime = newTime;
          }}
        />
      </div>
    </div>
  );
};
