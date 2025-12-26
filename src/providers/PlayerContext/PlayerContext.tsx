import { AudioFile } from "@/types/player";
import { createContext, Dispatch, SetStateAction } from "react";

interface PlayerContextProps {
  files: AudioFile[];
  currentFile: AudioFile | null;
  setFiles: Dispatch<SetStateAction<AudioFile[]>>;
  setCurrentFile: Dispatch<SetStateAction<AudioFile | null>>;
  filesRefs: Record<string, HTMLAudioElement>;
  setFilesRefs: Dispatch<SetStateAction<Record<string, HTMLAudioElement>>>;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(
  undefined
);
