import { getStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Cog, Heart, Home, Inbox, Trash } from '@mynaui/icons-react';
import { FileEntry, createDir, readDir } from '@tauri-apps/api/fs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddNewFiles } from './AddNewFiles';
import NavigationButtons from './NavigationButtons';
import { AddFolderDialog } from './sidebar/AddFolderDialog';
import { FolderList } from './sidebar/FolderList';
import { NavigationLink } from './sidebar/NavigationLink';

const linkClass =
  'flex items-center gap-1.5 py-1.5 hover:text-orange-600 group truncate w-full truncate';
const linkActiveClass = cn(
  linkClass,
  'text-orange-600 font-medium [&_svg]:text-orange-600'
);
const linkInActiveClass = cn(linkClass, 'text-slate-600');

const emojiContainerClass =
  'bg-white h-5 w-5 flex justify-center items-center rounded border-[0.5px] border-slate-300 text-[9px] text-slate-400 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600';

interface SidebarState {
  open: boolean;
  folderName: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [state, setState] = useState<SidebarState>({
    open: false,
    folderName: ''
  });
  const [directories, setDirectories] = useState<FileEntry[]>([]);

  const fetchDirectories = useCallback(async () => {
    try {
      const libraryLocation = await getStore('libraryLocation');
      const dirEntries = await readDir(libraryLocation);
      const dirs = dirEntries.filter((entry) => entry.children !== undefined);
      setDirectories(dirs);
    } catch (error) {
      console.error('Error reading directories:', error);
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
        const libraryLocation = await getStore('libraryLocation');
        const newFolderPath = `${libraryLocation}/${folderName}`;
        await createDir(newFolderPath, { recursive: true });
        setState({ open: false, folderName: '' });
        await fetchDirectories();
        navigate(`/folder/${encodeURIComponent(folderName)}`);
      } catch (error) {
        console.error('Error creating directory:', error);
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
        className="flex h-10 shrink-0 items-center justify-end border-b-[0.5px] border-slate-300 px-2"
      >
        <NavigationButtons />
      </div>
      <div className="w-full px-4">
        <AddNewFiles />
      </div>
      <div className="h-full overflow-auto">
        <nav className="flex w-full shrink-0 flex-col px-4">
          <NavigationLink icon={<Home />} to="/" label="Everything" />
          <NavigationLink
            icon={<Inbox />}
            to="/unorganized"
            label="Unorganized"
          />
          <NavigationLink icon={<Heart />} to="/favorites" label="Favorites" />
          <NavigationLink icon={<Trash />} to="/trash" label="Trash" />
          <NavigationLink icon={<Cog />} to="/settings" label="Settings" />

          <p className="pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Folders
          </p>

          <AddFolderDialog
            open={state.open}
            setOpen={handleOpenChange}
            handleCreateFolder={handleCreateFolder}
            folderName={state.folderName}
            setFolderName={handleFolderNameChange}
            emojiContainerClass={emojiContainerClass}
            linkInActiveClass={linkInActiveClass}
          />
          <FolderList
            directories={directories}
            linkActiveClass={linkActiveClass}
            linkInActiveClass={linkInActiveClass}
            emojiContainerClass={emojiContainerClass}
          />
        </nav>
      </div>
    </>
  );
}
