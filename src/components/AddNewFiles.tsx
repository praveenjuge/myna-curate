import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { writeBinaryFile, exists, createDir } from "@tauri-apps/api/fs";
import { getStore } from "@/lib/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "@mynaui/icons-react";

export const AddNewFiles: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if the current location is a specific folder
  const isSpecificFolder = location.pathname.startsWith("/folder/");

  const uploadFiles = async (files: File[]) => {
    const libraryLocation = await getStore("libraryLocation");
    let targetFolder = isSpecificFolder
      ? location.pathname.replace("/folder/", "")
      : "Unorganized";

    // Check if the "Unorganized" folder exists, if not create it
    if (targetFolder === "Unorganized") {
      const unorganizedPath = `${libraryLocation}/${targetFolder}`;
      if (!(await exists(unorganizedPath))) {
        await createDir(unorganizedPath, { recursive: true });
      }
    }

    await Promise.all(
      Array.from(files).map(async (file) => {
        const filePath = `${libraryLocation}/${targetFolder}/${file.name}`;

        // Convert the file to a Uint8Array and write it
        const fileArrayBuffer = await file.arrayBuffer();
        const fileUint8Array = new Uint8Array(fileArrayBuffer);
        await writeBinaryFile({ path: filePath, contents: fileUint8Array });
      })
    );
  };

  const handleFileSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length > 0) {
        try {
          toast.promise(uploadFiles(imageFiles), {
            loading: "Uploading...",
            success: "Files uploaded successfully",
            error: "Error uploading files",
          });
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      } else {
        toast.error("No image files selected");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelection}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <Button
        variant="primary"
        className="w-full gap-1 text-left shrink-0"
        onClick={handleButtonClick}
      >
        <Plus className="h-5 w-5 shrink-0" />
        <span className="truncate">Add New</span>
      </Button>
    </>
  );
};
