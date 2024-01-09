export default function Header() {
  return (
    <header
      className="w-full flex p-4 border-b-[0.5px] border-slate-300 justify-between items-center h-12"
      data-tauri-drag-region
    >
      <p>Everything</p>
      <button className="text-xs border">Options</button>
    </header>
  );
}
