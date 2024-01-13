import Sidebar from '@/components/Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';

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
          minSize={10}
          maxSize={30}
          order={1}
          tagName="aside"
          className="flex max-h-screen min-h-screen select-none flex-col gap-4 bg-white/90"
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          tagName="main"
          className="flex flex-col bg-white"
          order={2}
        >
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Toaster position="top-center" richColors />
    </>
  );
};

export default App;
