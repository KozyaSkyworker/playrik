"use client";

import { useRef, useState } from "react";

const File = () => {
  const [file, setFile] = useState<string | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>file</h1>
      <div
        className="w-[500px] h-[200px] bg-teal-400"
        onClick={(e) => {
          e.stopPropagation();
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log(e.dataTransfer.files);
          const fileUrl = URL.createObjectURL(e.dataTransfer.files[0]);
          setFile(fileUrl);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        Нажмите для выбора файлов или перетащите их сюда
        <input
          ref={(ref) => {
            inputFileRef.current = ref;

            return () => {
              inputFileRef.current = null;
            };
          }}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              const fileUrl = URL.createObjectURL(selectedFile);
              setFile(fileUrl);
            }
          }}
          type="file"
          //  TODO: multiple
          accept="audio/*"
          className="-z-1 hidden pointer-events-none"
        />
      </div>
      {file && (
        <div>
          <audio controls src={file} />
        </div>
      )}
    </div>
  );
};

export default File;
