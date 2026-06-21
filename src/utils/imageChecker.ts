import type {
  ComponentInstance,
  ImageIssue,
  PlatformConfig,
} from '@/types';

export function collectImageFields(components: ComponentInstance[]): Array<{
  componentId: string;
  componentType: ComponentInstance['type'];
  imageUrl: string;
  fieldName: string;
}> {
  const result: Array<{
    componentId: string;
    componentType: ComponentInstance['type'];
    imageUrl: string;
    fieldName: string;
  }> = [];

  components.forEach((comp) => {
    if (comp.type === 'buyerShowcase') {
      comp.images.forEach((img, idx) => {
        if (img.url) {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            imageUrl: img.url,
            fieldName: `images[${idx}].url`,
          });
        }
      });
    }
    if (comp.type === 'comparisonChart') {
      if (comp.ourImage) {
        result.push({
          componentId: comp.id,
          componentType: comp.type,
          imageUrl: comp.ourImage,
          fieldName: 'ourImage',
        });
      }
      if (comp.theirImage) {
        result.push({
          componentId: comp.id,
          componentType: comp.type,
          imageUrl: comp.theirImage,
          fieldName: 'theirImage',
        });
      }
    }
  });

  return result;
}

export async function getImageSizeKB(url: string): Promise<number | null> {
  try {
    if (url.startsWith('data:')) {
      const base64 = url.split(',')[1] || '';
      const bytes = Math.ceil((base64.length * 3) / 4);
      return bytes / 1024;
    }
    const response = await fetch(url, { method: 'GET', mode: 'cors' });
    if (!response.ok) throw new Error('fetch fail');
    const blob = await response.blob();
    return blob.size / 1024;
  } catch {
    return null;
  }
}

export async function checkImages(
  components: ComponentInstance[],
  platform: PlatformConfig,
): Promise<{ issues: ImageIssue[]; totalImages: number; totalSizeKB: number }> {
  const fields = collectImageFields(components);
  const issues: ImageIssue[] = [];
  let totalSizeKB = 0;

  for (const field of fields) {
    const size = await getImageSizeKB(field.imageUrl);
    if (size === null) continue;
    totalSizeKB += size;
    if (size > platform.maxImageSizeKB) {
      issues.push({
        componentId: field.componentId,
        componentType: field.componentType,
        imageUrl: field.imageUrl,
        fieldName: field.fieldName,
        actualSizeKB: Number(size.toFixed(1)),
        limitSizeKB: platform.maxImageSizeKB,
      });
    }
  }

  if (fields.length > platform.maxTotalImages) {
    // Not treated as ImageIssue but we log separately - added via totalImages check upstream
  }

  return {
    issues,
    totalImages: fields.length,
    totalSizeKB: Number(totalSizeKB.toFixed(1)),
  };
}
