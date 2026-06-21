import { Sparkles, Table2, Camera, ShieldCheck, GitCompare, Plus } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { COMPONENT_META, COMPONENT_ORDER } from '@/utils/platforms';
import type { ComponentType } from '@/types';

const ICONS: Record<ComponentType, React.ComponentType<{ className?: string }>> = {
  sellingPoints: Sparkles,
  parameterTable: Table2,
  buyerShowcase: Camera,
  afterSalePromise: ShieldCheck,
  comparisonChart: GitCompare,
};

export default function ComponentLibrary() {
  const addComponent = useBuilderStore((s) => s.addComponent);

  return (
    <aside className="w-64 shrink-0 h-full border-r border-slate-200 bg-white flex flex-col">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-brand" />
          组件库
        </h2>
        <p className="mt-1 text-xs text-slate-500">点击或拖拽添加到画布</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {COMPONENT_ORDER.map((type) => {
          const meta = COMPONENT_META[type];
          const Icon = ICONS[type];
          return (
            <button
              key={type}
              onClick={() => addComponent(type)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('component-type', type);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              className="w-full text-left group rounded-2xl p-4 border border-slate-200 bg-white hover:border-brand-400 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="relative flex items-start gap-3">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{meta.name}</h3>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-gradient-brand group-hover:text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{meta.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="rounded-xl bg-gradient-brand p-4 text-white">
          <div className="text-xs font-semibold opacity-90 mb-1">💡 使用提示</div>
          <p className="text-[11px] opacity-75 leading-relaxed">
            在画布中拖动组件可调整顺序，点击组件可在右侧编辑详细属性。
          </p>
        </div>
      </div>
    </aside>
  );
}
