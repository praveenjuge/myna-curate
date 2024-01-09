import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "@mynaui/icons-react";

interface AddFolderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreateFolder: (e: React.FormEvent) => void;
  folderName: string;
  setFolderName: (name: string) => void;
  emojiContainerClass: string;
}

export const AddFolderDialog: React.FC<AddFolderDialogProps> = ({
  open,
  setOpen,
  handleCreateFolder,
  folderName,
  setFolderName,
  emojiContainerClass,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-slate-600 flex items-center gap-1.5 py-1.5 group">
          <div className={emojiContainerClass}>
            <Plus className="h-4 w-4" />
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
