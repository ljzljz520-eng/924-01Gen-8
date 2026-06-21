import { create } from 'zustand';
import type { ComponentInstance, ComponentType, PlatformId } from '@/types';
import { createComponentByType, createInitialDemoComponents } from '@/utils/componentDefaults';
import { PLATFORMS } from '@/utils/platforms';

interface BuilderState {
  components: ComponentInstance[];
  selectedComponentId: string | null;
  platform: PlatformId;

  addComponent: (type: ComponentType) => void;
  removeComponent: (id: string) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  updateComponent: <T extends ComponentInstance>(id: string, patch: Partial<T>) => void;
  selectComponent: (id: string | null) => void;
  setPlatform: (p: PlatformId) => void;
  reset: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  components: createInitialDemoComponents(),
  selectedComponentId: null,
  platform: 'taobao',

  addComponent: (type) => {
    const newComp = createComponentByType(type);
    set((s) => ({
      components: [...s.components, newComp],
      selectedComponentId: newComp.id,
    }));
  },

  removeComponent: (id) => {
    set((s) => {
      const idx = s.components.findIndex((c) => c.id === id);
      if (idx === -1) return s;
      const newComponents = s.components.filter((c) => c.id !== id);
      const nextSelected =
        newComponents.length === 0
          ? null
          : newComponents[Math.max(0, idx - 1)]?.id ?? null;
      return { components: newComponents, selectedComponentId: nextSelected };
    });
  },

  moveComponent: (id, direction) => {
    set((s) => {
      const idx = s.components.findIndex((c) => c.id === id);
      if (idx === -1) return s;
      const newArr = [...s.components];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= newArr.length) return s;
      [newArr[idx], newArr[targetIdx]] = [newArr[targetIdx], newArr[idx]];
      return { components: newArr };
    });
  },

  reorderComponents: (fromIndex, toIndex) => {
    set((s) => {
      if (fromIndex === toIndex) return s;
      if (fromIndex < 0 || toIndex < 0) return s;
      if (fromIndex >= s.components.length || toIndex >= s.components.length) return s;
      const newArr = [...s.components];
      const [item] = newArr.splice(fromIndex, 1);
      newArr.splice(toIndex, 0, item);
      return { components: newArr };
    });
  },

  updateComponent: (id, patch) => {
    set((s) => ({
      components: s.components.map((c) =>
        c.id === id ? ({ ...c, ...patch } as ComponentInstance) : c,
      ),
    }));
  },

  selectComponent: (id) => set({ selectedComponentId: id }),
  setPlatform: (p) => set({ platform: p }),
  reset: () => set({ components: createInitialDemoComponents(), selectedComponentId: null }),
}));

export function useCurrentPlatform() {
  const platform = useBuilderStore((s) => s.platform);
  return PLATFORMS[platform];
}
