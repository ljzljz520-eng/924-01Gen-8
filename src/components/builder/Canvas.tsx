import { useMemo } from 'react';
import { useBuilderStore, useCurrentPlatform } from '@/store/builderStore';
import { useExportStore } from '@/store/exportStore';
import { usePlatformSize } from '@/hooks/usePlatformSize';
import CanvasComponentWrapper from './CanvasComponentWrapper';
import { Inbox, Plus } from 'lucide-react';

interface Props {
  maxWidth?: number;
}

export default function Canvas({ maxWidth = 720 }: Props) {
  const components = useBuilderStore((s) => s.components);
  const selectComponent = useBuilderStore((s) => s.selectComponent);
  const addComponent = useBuilderStore((s) => s.addComponent);
  const platform = useCurrentPlatform();
  const { canvasStyle, canvasWidth, previewScale } = usePlatformSize(maxWidth);

  const result = useExportStore((s) => s.result);

  const issueMap = useMemo(() => {
    if (!result) return {};
    const map: Record<string, { image: boolean; safeArea: boolean }> = {};
    result.imageIssues.forEach((i) => {
      map[i.componentId] = { ...(map[i.componentId] ?? { image: false, safeArea: false }), image: true };
    });
    result.safeAreaIssues.forEach((i) => {
      map[i.componentId] = { ...(map[i.componentId] ?? { image: false, safeArea: false }), safeArea: true };
    });
    return map;
  }, [result]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('component-type') as any;
    if (type) addComponent(type);
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-slate-100 px-6 py-8"
      onClick={() => selectComponent(null)}
    >
      <div className="mx-auto" style={{ maxWidth: canvasWidth * previewScale + 80 }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              {platform.name}
            </span>
            <span className="text-xs text-slate-500">
              {platform.width}px · 安全区 ±{platform.safePaddingX}px
            </span>
            <span className="text-xs text-slate-400">预览比例 {(previewScale * 100).toFixed(0)}%</span>
          </div>
          <div className="text-xs text-slate-500">
            共 <span className="font-bold text-slate-800">{components.length}</span> 个模块
          </div>
        </div>

        <div
          className="mx-auto rounded-[40px] bg-slate-900 p-4 shadow-device"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="w-16 h-1.5 rounded-full bg-slate-700" />
          </div>
          <div
            className="bg-slate-50 rounded-[28px] overflow-hidden relative mx-auto"
            style={{ width: canvasWidth, ...canvasStyle }}
          >
            {components.length === 0 ? (
              <div
                className="h-[600px] flex flex-col items-center justify-center text-center p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
                  <Inbox className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">画布是空的</h3>
                <p className="text-sm text-slate-500 mb-6">
                  从左侧组件库选择模块添加到此处开始搭建
                </p>
                <div className="flex gap-2">
                  {(['sellingPoints', 'parameterTable'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => addComponent(t)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      {t === 'sellingPoints' ? '添加卖点区' : '添加参数表'}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="space-y-1 py-2 bg-slate-50 min-h-[600px]"
                onClick={(e) => e.stopPropagation()}
              >
                {components.map((c, i) => (
                  <CanvasComponentWrapper
                    key={c.id}
                    component={c}
                    index={i}
                    total={components.length}
                    highlightIssues={issueMap[c.id]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
