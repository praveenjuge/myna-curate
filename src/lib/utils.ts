import { FileEntry, readDir } from '@tauri-apps/api/fs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readDirectoryRecursively(
  path: string
): Promise<FileEntry[]> {
  let entries: FileEntry[] = [];
  try {
    const fileEntries: FileEntry[] = await readDir(path);

    for (const entry of fileEntries) {
      if (entry.children) {
        // If the entry has children, it's a directory; read it recursively
        const subEntries = await readDirectoryRecursively(
          `${path}/${entry.name}`
        );
        entries = entries.concat(subEntries);
      } else if (entry.name?.match(/\.(jpg|jpeg|png|gif|JPG|PNG|webp)$/)) {
        // Add image files to the list
        entries.push({ ...entry, path: `${path}/${entry.name}` });
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  return entries;
}
