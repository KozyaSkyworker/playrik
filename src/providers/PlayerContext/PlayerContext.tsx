import { AudioFile } from "@/types/player";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";

interface PlayerContextProps {
  files: AudioFile[];
  prevPlayingFile: RefObject<HTMLAudioElement | null>;
  setFiles: Dispatch<SetStateAction<AudioFile[]>>;
  filesRefs: Record<string, HTMLAudioElement>;
  setFilesRefs: Dispatch<SetStateAction<Record<string, HTMLAudioElement>>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(
  undefined
);
