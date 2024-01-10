import { Button } from '@/components/ui/button';
import { open } from '@tauri-apps/api/dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveStore } from '../lib/store';

const Onboarding = () => {
  const navigate = useNavigate();
  const [libraryLocation, setLibraryLocation] = useState<string | string[]>('');

  const selectFolder = async () => {
    const path = await open({ directory: true, multiple: false });
    if (path) {
      saveStore('libraryLocation', path);
      setLibraryLocation(path);
      navigate('/');
    }
    console.log(libraryLocation);
  };

  return (
    <div
      data-tauri-drag-region
      className="flex h-screen w-screen flex-col items-center justify-center gap-5"
    >
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Myna Curate</h1>
        <p className="text-slate-600">
          Please select a library location to get started.
        </p>
      </div>
      <Button variant="primary" onClick={selectFolder}>
        Select Library Location
      </Button>
    </div>
  );
};

export default Onboarding;
