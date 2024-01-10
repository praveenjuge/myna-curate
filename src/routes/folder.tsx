import { EditDialog } from '@/components/EditDialog';
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
import { removeDir } from '@tauri-apps/api/fs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Folder() {
  const { folderName } = useParams();
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const libraryLocation = await getStore('libraryLocation');
      await removeDir(`${libraryLocation}/${folderName}`, { recursive: true });
      navigate('/');
      toast.success('Folder deleted successfully');
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Error deleting folder');
    }
  };

  return (
    <>
      <Header title={folderName ? decodeURIComponent(folderName) : 'Folder'}>
        <EditDialog folderName={folderName || ''} />

        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button size="xs" variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Folder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this folder? This action cannot be
              undone.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Header>

      {folderName && <ListImages for={`${folderName}`} />}
    </>
  );
}
