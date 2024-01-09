import { useState, useEffect, useRef } from "react";
import { readDir, FileEntry } from "@tauri-apps/api/fs";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { Masonry, Image as PinterestImage } from "gestalt";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { getStore } from "./lib/store";

type ImageFile = {
  src: string;
  name: string;
  naturalWidth: number;
  naturalHeight: number;
};

const App = () => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function getFiles() {
      const libraryLocation = await getStore("libraryLocation");
      if (libraryLocation) {
        try {
          const fileEntries: FileEntry[] = await readDir(libraryLocation);
          const imageFilesPromises = fileEntries
            .filter((file: FileEntry) =>
              file.name?.match(/\.(jpg|jpeg|png|gif|JPG|PNG|webp)$/)
            )
            .map((file: FileEntry) => {
              return new Promise<ImageFile>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                  resolve({
                    src: convertFileSrc(`${libraryLocation}/${file.name}`),
                    name: file.name ?? "",
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                  });
                };
                img.onerror = reject;
                img.src = convertFileSrc(`${libraryLocation}/${file.name}`);
              });
            });

          Promise.all(imageFilesPromises).then(setFiles).catch(console.error);
        } catch (error) {
          console.error("Error reading files:", error);
        }
      }
      console.log(libraryLocation);
    }

    getFiles();
  }, []);

  // Resize handler
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Setup and cleanup of the resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderItem = ({ data }: { data: ImageFile }) => (
    <PinterestImage
      src={data.src}
      alt={data.name}
      color="#EFEFEF"
      naturalWidth={data.naturalWidth}
      naturalHeight={data.naturalHeight}
    />
  );

  return (
    <section className="flex max-h-screen">
      <Sidebar />
      <main className="flex-1 shadow-sm flex flex-col">
        <Header />
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto overflow-x-hidden w-full h-full min-w-full max-w-full min-h-full max-h-full [&_img]:rounded-lg [&_img]:border [&_img]:border-slate-200 pt-4 pb-24"
        >
          {scrollContainerRef.current && (
            <Masonry
              virtualize
              minCols={1}
              items={files}
              gutterWidth={16}
              key={windowWidth}
              virtualBufferFactor={3}
              renderItem={renderItem}
              scrollContainer={() => scrollContainerRef.current as HTMLElement}
            />
          )}
        </div>
      </main>
    </section>
  );
};

export default App;
