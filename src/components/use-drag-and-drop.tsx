import { useState } from "react";

export const useDragAndDrop = () => {
  const [isFilesDragging, setIsFilesDragging] = useState(false);

  const uploadFiles = (filesToUpload: FileList) =>
    Array.from(filesToUpload).map((file) => ({
      src: URL.createObjectURL(file),
      title: file.name.split(".")[0],
    }));

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFilesDragging(false);
    return uploadFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFilesDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
    setIsFilesDragging(false);
  };

  return {
    uploadFiles,
    isFilesDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
