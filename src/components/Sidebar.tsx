import { useState, useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";
import { getStore, saveStore } from "../lib/store";
import { Plus } from "@mynaui/icons-react";

export default function Sidebar() {
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
    <aside className="w-64 pb-6 bg-slate-100 min-h-screen max-h-screen flex flex-col gap-6 border-r-[0.5px] border-slate-300 justify-between">
      <div className="flex flex-col gap-6">
        <div
          data-tauri-drag-region
          className="h-12 border-b-[0.5px] border-slate-300"
        ></div>
        <button className="flex justify-center items-center gap-2 border">
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
        <nav className="flex flex-col gap-3 px-6">
          <a href="/">Everything</a>
          <a href="/">Unorganized</a>
          <a href="/">Favorites</a>
          <a href="/">Settings</a>
          <a href="/">Trash</a>
        </nav>
      </div>
      <button onClick={selectFolder} className="text-xs border">
        Location: {files ? <p>{files}</p> : "Select Location"}
      </button>
    </aside>
  );
}
