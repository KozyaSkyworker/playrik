"use client";

import { Heading } from "@/shared/ui/Heading";
import { useRef } from "react";
import { usePlayerContext } from "@/providers/PlayerContext";
import { useDragAndDrop } from "@/hooks";

export const UploadContainer = () => {
  const {
    uploadFiles,
    isFilesDragging,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  } = useDragAndDrop();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { setFiles } = usePlayerContext();

  return (
    <>
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
          setFiles((files) => [...files, ...filesToUpload]);
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
              setFiles((files) => [...files, ...filesToUpload]);
            }
          }}
          type="file"
          multiple
          accept="audio/*"
          className="-z-1 hidden pointer-events-none"
        />
      </div>
    </>
  );
};
