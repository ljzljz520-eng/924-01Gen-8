import type { ComponentInstance, PlatformConfig, ExportCheckResult } from '@/types';
import { checkImages } from './imageChecker';
import { checkSafeArea } from './safeAreaChecker';

export async function runFullCheck(
  components: ComponentInstance[],
  platform: PlatformConfig,
): Promise<ExportCheckResult> {
  const imgResult = await checkImages(components, platform);
  const safeIssues = checkSafeArea(components, platform);

  const passed = imgResult.issues.length === 0 && safeIssues.length === 0;
  return {
    passed,
    totalImages: imgResult.totalImages,
    totalImageSizeKB: imgResult.totalSizeKB,
    imageIssues: imgResult.issues,
    safeAreaIssues: safeIssues,
    timestamp: Date.now(),
  };
}

export function downloadJSON(data: unknown, filename = 'detail-page-config.json') {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function formatFileSizeKB(kb: number): string {
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}
