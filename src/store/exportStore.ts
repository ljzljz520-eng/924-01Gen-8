import { create } from 'zustand';
import type { ExportCheckResult } from '@/types';
import { runFullCheck, downloadJSON } from '@/utils/exportUtils';
import { useBuilderStore } from './builderStore';
import { PLATFORMS } from '@/utils/platforms';

interface ExportState {
  isChecking: boolean;
  result: ExportCheckResult | null;
  runCheck: () => Promise<void>;
  exportJson: () => void;
  clearResult: () => void;
}

export const useExportStore = create<ExportState>((set) => ({
  isChecking: false,
  result: null,

  runCheck: async () => {
    set({ isChecking: true, result: null });
    try {
      const { components, platform } = useBuilderStore.getState();
      const cfg = PLATFORMS[platform];
      const result = await runFullCheck(components, cfg);
      set({ result, isChecking: false });
    } catch (e) {
      console.error(e);
      set({ isChecking: false });
    }
  },

  exportJson: () => {
    const { components, platform } = useBuilderStore.getState();
    const cfg = PLATFORMS[platform];
    downloadJSON(
      {
        platform: cfg,
        generatedAt: new Date().toISOString(),
        components,
      },
      `detail-page-${cfg.id}-${Date.now()}.json`,
    );
  },

  clearResult: () => set({ result: null }),
}));
