import { useState, useRef } from 'react';
import { GripVertical, ChevronUp, ChevronDown, Trash2, Copy } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { COMPONENT_META } from '@/utils/platforms';
import DetailRenderer from './DetailRenderer';
import type { ComponentInstance } from '@/types';

interface Props {
  component: ComponentInstance;
  index: number;
  total: number;
  highlightIssues?: {
    image?: boolean;
    safeArea?: boolean;
  };
}

export default function CanvasComponentWrapper({ component, index, total, highlightIssues }: Props) {
  const meta = COMPONENT_META[component.type];
  const selected = useBuilderStore((s) => s.selectedComponentId === component.id);
  const select = useBuilderStore((s) => s.selectComponent);
  const remove = useBuilderStore((s) => s.removeComponent);
  const move = useBuilderStore((s) => s.moveComponent);
  const reorder = useBuilderStore((s) => s.reorderComponents);
  const add = useBuilderStore((s) => s.addComponent);

  const [dragOver, setDragOver] = useState<'top' | 'bottom' | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragDataRef = useRef<{ index: number } | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setDragging(true);
    dragDataRef.current = { index };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    setDragOver(e.clientY < midpoint ? 'top' : 'bottom');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIdx = dragDataRef.current?.index ?? Number(e.dataTransfer.getData('text/plain'));
    if (fromIdx == null || isNaN(fromIdx)) return;
    const toIdx = dragOver === 'top' ? index : index + 1;
    const adjustedTo = fromIdx < toIdx ? toIdx - 1 : toIdx;
    reorder(fromIdx, adjustedTo);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragDataRef.current = null;
  };

  const duplicate = () => {
    add(component.type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(null)}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`group relative transition-all ${dragging ? 'dragging' : ''} ${
        dragOver === 'top' ? 'drag-over-top' : ''
      } ${dragOver === 'bottom' ? 'drag-over-bottom' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        select(component.id);
      }}
    >
      {selected && (
        <div className="sticky top-0 z-30 -mb-10 flex justify-center pt-2">
          <div className="inline-flex items-center gap-1 rounded-full bg-brand-700 text-white px-1.5 py-1 shadow-lg shadow-brand-900/20">
            <button
              draggable
              onDragStart={handleDragStart}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full hover:bg-white/10 cursor-grab active:cursor-grabbing"
              title="拖拽排序"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-xs font-semibold px-2">{meta.name}</span>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(component.id, 'up');
              }}
              disabled={index === 0}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              title="上移"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(component.id, 'down');
              }}
              disabled={index === total - 1}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              title="下移"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicate();
              }}
              className="p-1.5 rounded-full hover:bg-white/10"
              title="复制"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                remove(component.id);
              }}
              className="p-1.5 rounded-full hover:bg-red-500/90"
              title="删除"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`relative ${
          selected
            ? 'ring-2 ring-brand-600 ring-offset-2 ring-offset-slate-100 rounded-2xl'
            : 'hover:ring-1 hover:ring-slate-300 hover:rounded-2xl'
        } transition-all`}
      >
        {(highlightIssues?.image || highlightIssues?.safeArea) && (
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end pointer-events-none">
            {highlightIssues.image && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-lg">
                ⚠️ 图片过大
              </span>
            )}
            {highlightIssues.safeArea && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-lg">
                ⚠️ 文字溢出
              </span>
            )}
          </div>
        )}

        <DetailRenderer component={component} />

        {!selected && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold shadow-sm border border-slate-200">
              <GripVertical className="w-3 h-3 text-slate-400" />
              {meta.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
