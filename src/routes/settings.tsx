import { useState, useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";
import { getStore, saveStore } from "../lib/store";
import Header from "@/components/Header";

export default function Settings() {
  const [files, setFiles] = useState<string | string[]>(""); // State for files, typed as string

  useEffect(() => {
    async function fetchStoredLocation() {
      const storedLocation = await getStore("libraryLocation");
      if (storedLocation) {
        setFiles(storedLocation);
      }
    }

    fetchStoredLocation();
  }, []); // Empty dependency array to run only once on mount

  const selectFolder = async () => {
    const path = await open({
      directory: true,
      multiple: false,
    });

    if (path) {
      saveStore("libraryLocation", path);
      setFiles(path); // Update state when new path is selected
    }
  };
  return (
    <>
      <Header title="Settings" />

      <div className="p-4">
        <button onClick={selectFolder} className="text-xs border">
          Location: {files ? <p>{files}</p> : "Select Location"}
        </button>
      </div>
    </>
  );
}
