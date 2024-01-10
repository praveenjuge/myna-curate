import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <header
      className="flex h-10 w-full items-center justify-between border-b-[0.5px] border-slate-300 p-4"
      data-tauri-drag-region
    >
      <h1 className="font-medium">{title}</h1>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}
