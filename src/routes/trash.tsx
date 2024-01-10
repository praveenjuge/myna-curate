import Header from '@/components/Header';
import ListImages from '@/components/ListImages';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getStore } from '@/lib/store';
import { readDirectoryRecursively } from '@/lib/utils';
import { FileEntry, removeFile } from '@tauri-apps/api/fs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Trash() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trashPath, setTrashPath] = useState('');
  const [isTrashEmpty, setIsTrashEmpty] = useState(true); // State to track if trash is empty

  const refreshPage = () => {
    // Navigating to the current path will trigger a re-render
    navigate(0);
  };

  useEffect(() => {
    const fetchTrashPath = async () => {
      const libraryLocation = await getStore('libraryLocation');
      if (libraryLocation) {
        setTrashPath(`${libraryLocation}/trash`);
        const fileEntries: FileEntry[] = await readDirectoryRecursively(
          `${libraryLocation}/trash`
        );
        setIsTrashEmpty(fileEntries.length === 0); // Update state based on trash content
      }
    };
    fetchTrashPath();
  }, []);

  const handleDeleteConfirmation = async () => {
    setIsDialogOpen(false);
    try {
      if (!trashPath) {
        toast.error('Trash folder path is not defined');
        return;
      }
      const fileEntries: FileEntry[] =
        await readDirectoryRecursively(trashPath);
      for (const file of fileEntries) {
        await removeFile(file.path);
      }
      toast.success('All files deleted successfully');
      refreshPage(); // Refresh the page after deletion
    } catch (error) {
      console.error('Error deleting files:', error);
      toast.error('Error deleting files');
    }
  };

  return (
    <>
      <Header title="Trash">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button size="xs" variant="destructive" disabled={isTrashEmpty}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Delete All</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete all files in trash?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirmation}>
                Yes, delete all
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Header>
      <ListImages for="trash" />
    </>
  );
}
