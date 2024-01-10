import Header from '@/components/Header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { open } from '@tauri-apps/api/dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStore, saveStore } from '../lib/store';

export default function Settings() {
  const [files, setFiles] = useState<string | string[]>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for the AlertDialog visibility
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStoredLocation() {
      const storedLocation = await getStore('libraryLocation');
      if (storedLocation) {
        setFiles(storedLocation);
      }
    }

    fetchStoredLocation();
  }, []);

  const selectFolder = async () => {
    const path = await open({
      directory: true,
      multiple: false
    });

    if (path) {
      saveStore('libraryLocation', path);
      setFiles(path);
      navigate(0);
    }
  };

  const handleDeleteConfirmation = () => {
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    saveStore('libraryLocation', '');
    setFiles('');
    navigate('/onboarding'); // navigate to onboarding when library location is removed
    setIsDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false); // Close the dialog without deleting
  };

  const isDeleteDisabled = !files || files.length === 0;

  return (
    <>
      <Header title="Settings" />
      <div className="p-4">
        <div className="mx-auto max-w-4xl overflow-y-auto">
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
            <Label>Library Location</Label>
            <div className="flex items-center gap-1">
              <Button onClick={selectFolder}>
                {files ? <p>{files}</p> : 'Select Location'}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirmation}
                disabled={isDeleteDisabled}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AlertDialog for delete confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected location from your settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
