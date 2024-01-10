import { FileEntry } from '@tauri-apps/api/fs';
import { NavLink } from 'react-router-dom';

interface FolderListProps {
  directories: FileEntry[];
  linkActiveClass: string;
  linkInActiveClass: string;
  emojiContainerClass: string;
}

export const FolderList: React.FC<FolderListProps> = ({
  directories,
  linkActiveClass,
  linkInActiveClass,
  emojiContainerClass
}) => {
  return (
    <>
      {directories.map((directory) => (
        <NavLink
          key={directory.path}
          className={({ isActive }) =>
            isActive ? linkActiveClass : linkInActiveClass
          }
          to={`/folder/${encodeURIComponent(directory.name || 'Default Name')}`}
        >
          <div className={emojiContainerClass}>
            <span>📁</span>
          </div>
          <span className="w-full truncate">{directory.name}</span>
        </NavLink>
      ))}
    </>
  );
};
