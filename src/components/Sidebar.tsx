import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Cog, Heart, Home, Inbox, Trash } from "@mynaui/icons-react";
import NavigationButtons from "./NavigationButtons";
import { cn } from "@/lib/utils";
import { FileEntry, createDir, readDir } from "@tauri-apps/api/fs";
import { getStore } from "@/lib/store";
import { NavigationLink } from "./sidebar/NavigationLink";
import { AddFolderDialog } from "./sidebar/AddFolderDialog";
import { FolderList } from "./sidebar/FolderList";
import { AddNewFiles } from "./AddNewFiles";
import { ScrollArea } from "@/components/ui/scroll-area";

const linkClass =
  "flex items-center gap-1.5 py-1.5 hover:text-orange-600 group truncate";
const linkActiveClass = cn(
  linkClass,
  "text-orange-600 font-medium [&_svg]:text-orange-600"
);
const linkInActiveClass = cn(linkClass, "text-slate-600");
const emojiContainerClass =
  "bg-white h-5 w-5 flex justify-center items-center rounded ring-[0.5px] ring-slate-300 text-[9px] shrink-0";

interface SidebarState {
  open: boolean;
  folderName: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [state, setState] = useState<SidebarState>({
    open: false,
    folderName: "",
  });
  const [directories, setDirectories] = useState<FileEntry[]>([]);

  const fetchDirectories = useCallback(async () => {
    try {
      const libraryLocation = await getStore("libraryLocation");
      const dirEntries = await readDir(libraryLocation);
      const dirs = dirEntries.filter((entry) => entry.children !== undefined);
      setDirectories(dirs);
    } catch (error) {
      console.error("Error reading directories:", error);
    }
  }, []);

  useEffect(() => {
    fetchDirectories();
  }, [fetchDirectories]);

  const handleCreateFolder = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { folderName } = state;
      if (!folderName) return;

      try {
        const libraryLocation = await getStore("libraryLocation");
        const newFolderPath = `${libraryLocation}/${folderName}`;
        await createDir(newFolderPath, { recursive: true });
        setState({ open: false, folderName: "" });
        await fetchDirectories();
        navigate(`/folder/${encodeURIComponent(folderName)}`);
      } catch (error) {
        console.error("Error creating directory:", error);
      }
    },
    [state, fetchDirectories, navigate]
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setState((prevState) => ({ ...prevState, open }));
  }, []);

  const handleFolderNameChange = useCallback((folderName: string) => {
    setState((prevState) => ({ ...prevState, folderName }));
  }, []);

  return (
    <>
      <div
        data-tauri-drag-region
        className="h-10 shrink-0 border-b-[0.5px] border-slate-300 flex items-center justify-end px-2"
      >
        <NavigationButtons />
      </div>
      <div className="px-4 w-full">
        <AddNewFiles />
      </div>
      <ScrollArea>
        <nav className="flex flex-col px-4 overflow-y-auto shrink-0">
          <NavigationLink icon={<Home />} to="/" label="Everything" />
          <NavigationLink
            icon={<Inbox />}
            to="/unorganized"
            label="Unorganized"
          />
          <NavigationLink icon={<Heart />} to="/favorites" label="Favorites" />
          <NavigationLink icon={<Trash />} to="/trash" label="Trash" />
          <NavigationLink icon={<Cog />} to="/settings" label="Settings" />

          <p className="uppercase text-[11px] font-semibold tracking-wide text-slate-500 pt-4 pb-1">
            Folders
          </p>

          <AddFolderDialog
            open={state.open}
            setOpen={handleOpenChange}
            handleCreateFolder={handleCreateFolder}
            folderName={state.folderName}
            setFolderName={handleFolderNameChange}
            emojiContainerClass={emojiContainerClass}
          />
          <FolderList
            directories={directories}
            linkActiveClass={linkActiveClass}
            linkInActiveClass={linkInActiveClass}
            emojiContainerClass={emojiContainerClass}
          />
        </nav>
      </ScrollArea>
    </>
  );
}
