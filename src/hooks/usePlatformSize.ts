import { useMemo } from 'react';
import { useCurrentPlatform } from '@/store/builderStore';

interface UsePlatformSizeReturn {
  canvasWidth: number;
  canvasStyle: React.CSSProperties;
  safePaddingX: number;
  safePaddingY: number;
  previewScale: number;
  innerStyle: React.CSSProperties;
}

export function usePlatformSize(maxAvailableWidth = 720): UsePlatformSizeReturn {
  const platform = useCurrentPlatform();

  return useMemo(() => {
    const previewScale = Math.min(1, maxAvailableWidth / platform.width);
    const canvasStyle: React.CSSProperties = {
      width: platform.width,
      transform: `scale(${previewScale})`,
      transformOrigin: 'top center',
    };
    const innerStyle: React.CSSProperties = {
      paddingLeft: platform.safePaddingX,
      paddingRight: platform.safePaddingX,
      paddingTop: platform.safePaddingY,
      paddingBottom: platform.safePaddingY,
    };
    return {
      canvasWidth: platform.width,
      canvasStyle,
      safePaddingX: platform.safePaddingX,
      safePaddingY: platform.safePaddingY,
      previewScale,
      innerStyle,
    };
  }, [platform, maxAvailableWidth]);
}
