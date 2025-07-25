"use client";

import { useRef, useState } from "react";
import { Heading } from "./Heading";

import { AudioFile, File } from "./File";

export const Files = () => {
  const [files, setFiles] = useState<AudioFile[]>([]);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isFilesDragging, setIsFilesDragging] = useState(false);

  const uploadFile = (filesToUpload: FileList) => {
    const newFiles = Array.from(filesToUpload).map((file) => {
      console.log(file);
      const fileUrl = URL.createObjectURL(file);
      const uploadFile: AudioFile = {
        src: fileUrl,
        title: file.name.split(".")[0],
      };
      return uploadFile;
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

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
          e.preventDefault();
          setIsFilesDragging(false);
          uploadFile(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsFilesDragging(true);
        }}
        onDragLeave={(e) => {
          console.log(e);
          setIsFilesDragging(false);
        }}
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
              uploadFile(e.target.files);
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
          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <File key={crypto.randomUUID()} {...file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
