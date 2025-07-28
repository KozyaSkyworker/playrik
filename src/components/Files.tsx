"use client";

import { useRef, useState } from "react";

import { Heading } from "@/shared/ui/Heading";

import { useDragAndDrop } from "./use-drag-and-drop";
import { AudioFile, File } from "./File";

export const Files = () => {
  const [files, setFiles] = useState<AudioFile[]>([]);

  const filesRefs = useRef<Record<string, HTMLAudioElement>>({});
  const currentPlayingFile = useRef<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlePlayPause = (id: string) => {
    const audioElement = filesRefs.current[id];

    if (!audioElement) return;

    if (currentPlayingFile.current === id) {
      audioElement.pause();
      currentPlayingFile.current = null;
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, isPlaying: false } : f))
      );
      return;
    }

    if (currentPlayingFile.current) {
      const prevAudio = filesRefs.current[currentPlayingFile.current];
      if (prevAudio) {
        prevAudio.pause();
      }
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, isPlaying: false } : f))
      );
      audioElement.currentTime = 0;
    }

    audioElement.play();
    currentPlayingFile.current = id;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isPlaying: true } : { ...f, isPlaying: false }
      )
    );
  };

  const onLikedToggle = (id: string) => {
    setFiles((prev) =>
      prev.map((itm) =>
        itm.id === id ? { ...itm, isLiked: !itm.isLiked } : itm
      )
    );
  };

  const {
    uploadFiles,
    isFilesDragging,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  } = useDragAndDrop();

  return (
    <div className="flex flex-col gap-4">
      <Heading>Uploading files</Heading>

      <div
        className={`w-full h-[300px] rounded  ${
          isFilesDragging ? "bg-teal-300" : "bg-teal-200"
        } cursor-pointer flex items-center justify-center`}
        onClick={(e) => {
          e.stopPropagation();
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
        onDrop={(e) => {
          const filesToUpload = handleDrop(e);
          setFiles((prev) => [...prev, ...filesToUpload]);
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className="text-xl pointer-events-none">
          Нажмите для выбора файлов или перетащите их сюда
        </p>
        <input
          ref={(ref) => {
            inputFileRef.current = ref;

            return () => {
              inputFileRef.current = null;
            };
          }}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              const filesToUpload = uploadFiles(e.target.files);
              setFiles((prev) => [...prev, ...filesToUpload]);
            }
          }}
          type="file"
          multiple
          accept="audio/*"
          className="-z-1 hidden pointer-events-none"
        />
      </div>

      {files && files.length > 0 && (
        <div className="flex flex-col gap-4">
          <Heading variant="h2">Uploaded files</Heading>
          <div className="flex flex-col gap-10">
            {files.map((file) => (
              <File
                key={file.id}
                filesRefs={filesRefs}
                currentPlayingFile={currentPlayingFile}
                onPlayPause={handlePlayPause}
                onLikedToggle={onLikedToggle}
                {...file}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
