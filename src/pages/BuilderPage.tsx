import TopToolbar from '@/components/builder/TopToolbar';
import ComponentLibrary from '@/components/builder/ComponentLibrary';
import Canvas from '@/components/builder/Canvas';
import PropertyPanel from '@/components/builder/PropertyPanel';

export default function BuilderPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <TopToolbar />
      <div className="flex-1 flex min-h-0">
        <ComponentLibrary />
        <Canvas />
        <PropertyPanel />
      </div>
    </div>
  );
}
