export default function Header({ title }: { title: string }) {
  return (
    <header
      className="w-full flex p-4 border-b-[0.5px] border-slate-300 justify-between items-center h-10"
      data-tauri-drag-region
    >
      <h1>{title}</h1>
      <button className="text-xs border">Options</button>
    </header>
  );
}
