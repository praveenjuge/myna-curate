import { getStore } from '@/lib/store';
import { readDirectoryRecursively } from '@/lib/utils';
import { FileEntry } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PhotoAlbum, { Photo } from 'react-photo-album';

type ListImagesProps = {
  for: string;
};

const ListImages: React.FC<ListImagesProps> = ({ for: context }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const libraryLocation = useMemo(() => getStore('libraryLocation'), []);

  const buildImagePath = (context: string, libraryLocation: string) => {
    return context === 'everything'
      ? libraryLocation
      : `${libraryLocation}/${context}`;
  };

  const fetchImages = useCallback(async () => {
    try {
      const location = await libraryLocation;
      if (!location) {
        setError('Library location is not defined');
        return;
      }

      const path = buildImagePath(context, location);
      const fileEntries: FileEntry[] = await readDirectoryRecursively(path);
      const imageFiles = await Promise.all(
        fileEntries.map((file) => loadImage(file))
      );

      setPhotos(imageFiles);
    } catch (error) {
      console.error(error);
      setError('Error fetching images');
    }
  }, [context, libraryLocation]);

  const loadImage = (file: FileEntry): Promise<Photo> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(createPhoto(file, img));
      img.onerror = reject;
      img.src = convertFileSrc(file.path);
    });
  };

  const createPhoto = (file: FileEntry, img: HTMLImageElement): Photo => {
    return {
      src: convertFileSrc(file.path),
      width: img.naturalWidth,
      height: img.naturalHeight,
      alt: file.name ?? ''
    };
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden p-4 pb-24 [&_img]:rounded-lg [&_img]:ring-[0.5px] [&_img]:ring-slate-300/75">
      <PhotoAlbum layout="masonry" photos={photos} />
    </div>
  );
};

export default ListImages;
