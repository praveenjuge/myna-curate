import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from '@mynaui/icons-react';
import React from 'react';

interface AddFolderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreateFolder: (e: React.FormEvent) => void;
  folderName: string;
  setFolderName: (name: string) => void;
  emojiContainerClass: string;
  linkInActiveClass: string;
}

export const AddFolderDialog: React.FC<AddFolderDialogProps> = ({
  open,
  setOpen,
  handleCreateFolder,
  folderName,
  setFolderName,
  emojiContainerClass,
  linkInActiveClass
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={linkInActiveClass}>
          <div className={emojiContainerClass}>
            <Plus className="h-3.5 w-3.5" />
          </div>
          <span>Add New...</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Folder</DialogTitle>
          <DialogDescription>Create a new folder</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateFolder}>
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter folder name here"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
