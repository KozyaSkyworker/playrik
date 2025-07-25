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
import { Button } from "./Button";
import { Heading } from "./Heading";

export interface AudioFile {
  src: string;
  title: string;
}

export const File = ({ title, src }: AudioFile) => {
  return (
    <div className="bg-gray-100 rounded p-4">
      <Heading variant="h3">{title}</Heading>
      <audio controls src={src} />
      <div className="flex gap-3">
        <Button variant="icon-filled">
          <PrevIcon />
        </Button>
        <Button variant="icon-filled">
          <PlayIcon />
        </Button>
        <Button variant="icon-filled">
          <PauseIcon />
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
      </div>
    </div>
  );
};
