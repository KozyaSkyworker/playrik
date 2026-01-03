"use client";

import { useState } from "react";

import { MuteIcon } from "@/shared/icons/Mute";
import { UnMuteIcon } from "@/shared/icons/UnMute";

import { Button } from "@/shared/ui/Button";
import { LOCAL_STORAGE_KEY, VOLUME_DEFAULT } from "@/shared/constants/volume";
import { NextIcon } from "@/shared/icons/Next";
import { RepeatIcon } from "@/shared/icons/Repeat";
import { ShuffleIcon } from "@/shared/icons/Shuffle";
import { PlayIcon } from "@/shared/icons/Play";
import { Heading } from "@/shared/ui/Heading";
import { usePlayerContext } from "@/providers/PlayerContext";
import { PauseIcon } from "@/shared/icons/Pause";
import { FavIcon } from "@/shared/icons/Fav";
import { FavFillIcon } from "@/shared/icons/FavFill";
import { PrevIcon } from "@/shared/icons/Prev";
import { getFormatedTime } from "@/shared/utils/getFormatedTime";

export const ControlsPanel = () => {
  const {
    files,
    setFiles,
    filesRefs,
    currentIndex,
    setTime,
    time,
    prevPlayingFile,
    setCurrentIndex,
  } = usePlayerContext();

  const [isMuted, setIsMuted] = useState(false);
  const [localVolume, setLocalVolume] = useState(
    (typeof window !== "undefined" &&
      Number(localStorage.getItem(LOCAL_STORAGE_KEY))) ||
      VOLUME_DEFAULT
  );

  const muted = isMuted || localVolume === 0;

  const toggleMuted = () => {
    const newIsMuted = !isMuted;

    // if (newIsMuted) {
    //   setLocalVolume(0)
    //   localStorage.setItem(LOCAL_STORAGE_KEY, '0');
    // } else {

    // }

    setIsMuted(newIsMuted);
  };

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

  const startTrackByIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex > files.length - 1) {
      return;
    }

    const newFile = files.at(newIndex);
    if (newFile) {
      handlePlay(newFile?.id);
      setCurrentIndex(newIndex);
    }
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

  if (files.length < 1) {
    return null;
  }

  const { id, isLiked, title, duration } = files[currentIndex];

  // с задержкой небольшой меняется
  const isPlaying = filesRefs[id]?.duration > 0 && !filesRefs[id]?.paused;

  return (
    <div className="fixed bottom-0 bg-slate-300 w-[1200px] h-max p-4 rounded-t">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="icon-filled"
            onClick={() => startTrackByIndex(currentIndex - 1)}
          >
            <PrevIcon />
          </Button>
          <Button
            variant="icon-filled"
            onClick={() => {
              if (isPlaying) handlePause(id);
              else handlePlay(id);
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant="icon-filled"
            onClick={() => startTrackByIndex(currentIndex + 1)}
          >
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

        <div className="flex flex-col gap-1 grow">
          <Heading variant="h3">{title}</Heading>
          <div className="grow">
            <div className="flex align-center justify-between">
              <span>{getFormatedTime(filesRefs[id]?.currentTime)}</span>
              <span>
                {getFormatedTime(duration ?? filesRefs[id]?.duration)}
              </span>
            </div>
            <input
              className="w-full h-[5px]  bg-teal-600 rounded"
              type="range"
              min={0}
              max={String(filesRefs[id]?.duration)}
              value={time}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setTime(newTime);
                if (filesRefs[id]) {
                  filesRefs[id].currentTime = newTime;
                }
              }}
            />
          </div>
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
