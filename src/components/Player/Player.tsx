import { ControlsPanel } from "./ControlsPanel";
import { UploadContainer } from "./UploadContainer";
import { Files } from "./Files";

export const Player = () => {
  // const [currentFile, setCurrentFile] = useState<AudioFile | null>(null);

  // const currentPlayingFile = useRef<string | null>(null);

  // const handlePlayPause = (id: string) => {
  //   const audioElement = filesRefs.current[id];

  //   if (!audioElement) return;

  //   if (currentPlayingFile.current === id) {
  //     audioElement.pause();
  //     currentPlayingFile.current = null;
  //     setFiles((prev) =>
  //       prev.map((f) => (f.id === id ? { ...f, isPlaying: false } : f))
  //     );
  //     return;
  //   }

  //   if (currentPlayingFile.current) {
  //     const prevAudio = filesRefs.current[currentPlayingFile.current];
  //     if (prevAudio) {
  //       prevAudio.pause();
  //       prevAudio.currentTime = 0;
  //     }
  //     setFiles((prev) =>
  //       prev.map((f) => (f.id === id ? { ...f, isPlaying: false } : f))
  //     );
  //     audioElement.currentTime = 0;
  //   }

  //   audioElement.play();
  //   currentPlayingFile.current = id;
  // setFiles((prev) =>
  //   prev.map((f) =>
  //     f.id === id ? { ...f, isPlaying: true } : { ...f, isPlaying: false }
  //   )
  // );
  // };

  // const onLikedToggle = (id: string) => {
  //   setFiles((prev) =>
  //     prev.map((itm) =>
  //       itm.id === id ? { ...itm, isLiked: !itm.isLiked } : itm
  //     )
  //   );
  // };

  return (
    <>
      <div className="flex flex-col gap-4">
        <UploadContainer />
        <Files />
        <ControlsPanel />
      </div>
    </>
  );
};
