import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getStore, saveStore } from '@/lib/store';
import React from 'react';
import { toast } from 'sonner';

interface EditDialogProps {
  folderName: string;
}

export const EditDialog: React.FC<EditDialogProps> = ({ folderName }) => {
  const [newFolderName, setNewFolderName] = React.useState(folderName);

  const handleSave = async () => {
    try {
      const libraryLocation = await getStore('libraryLocation');
      await saveStore(`${libraryLocation}/${folderName}`, newFolderName);
      toast.success('Folder name updated successfully');
    } catch (error) {
      console.error('Error updating folder name:', error);
      toast.error('Error updating folder name');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Folder Name</DialogTitle>
        </DialogHeader>
        <Input
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
