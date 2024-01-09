import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const App = () => {
  return (
    <>
      <ResizablePanelGroup
        tagName="section"
        direction="horizontal"
        autoSaveId="ResizablePanelGroup"
        className="max-h-screen min-h-screen"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={30}
          order={1}
          tagName="aside"
          className="min-w-32 select-none bg-slate-100 min-h-screen max-h-screen flex flex-col gap-4 border-r-[0.5px] border-slate-300"
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel tagName="main" className="flex flex-col" order={2}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Toaster position="top-center" richColors />
    </>
  );
};

export default App;
