import type {
  ComponentInstance,
  SafeAreaIssue,
  PlatformConfig,
} from '@/types';

let canvas: HTMLCanvasElement | null = null;

function getContext(): CanvasRenderingContext2D | null {
  if (typeof document === 'undefined') return null;
  if (!canvas) canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return ctx;
}

function measureText(text: string, fontSize = 16, fontWeight = 400): number {
  const ctx = getContext();
  if (!ctx) return text.length * fontSize * 0.5;
  ctx.font = `${fontWeight} ${fontSize}px "Noto Sans SC", sans-serif`;
  return ctx.measureText(text).width;
}

function collectTextFields(components: ComponentInstance[]): Array<{
  componentId: string;
  componentType: ComponentInstance['type'];
  text: string;
  fieldName: string;
  fontSize: number;
  fontWeight: number;
}> {
  const result: Array<{
    componentId: string;
    componentType: ComponentInstance['type'];
    text: string;
    fieldName: string;
    fontSize: number;
    fontWeight: number;
  }> = [];

  components.forEach((comp) => {
    if (comp.title) {
      result.push({
        componentId: comp.id,
        componentType: comp.type,
        text: comp.title,
        fieldName: 'title',
        fontSize: 22,
        fontWeight: 700,
      });
    }

    switch (comp.type) {
      case 'sellingPoints':
        comp.items.forEach((item, idx) => {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: item.title,
            fieldName: `items[${idx}].title`,
            fontSize: 16,
            fontWeight: 700,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: item.description,
            fieldName: `items[${idx}].description`,
            fontSize: 14,
            fontWeight: 400,
          });
        });
        break;
      case 'parameterTable':
        comp.rows.forEach((row, idx) => {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: row.name,
            fieldName: `rows[${idx}].name`,
            fontSize: 14,
            fontWeight: 500,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: row.value,
            fieldName: `rows[${idx}].value`,
            fontSize: 14,
            fontWeight: 400,
          });
        });
        break;
      case 'buyerShowcase':
        comp.images.forEach((b, idx) => {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: b.userName,
            fieldName: `images[${idx}].userName`,
            fontSize: 13,
            fontWeight: 500,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: b.comment,
            fieldName: `images[${idx}].comment`,
            fontSize: 13,
            fontWeight: 400,
          });
        });
        break;
      case 'afterSalePromise':
        comp.items.forEach((it, idx) => {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: it.title,
            fieldName: `items[${idx}].title`,
            fontSize: 15,
            fontWeight: 600,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: it.detail,
            fieldName: `items[${idx}].detail`,
            fontSize: 12,
            fontWeight: 400,
          });
        });
        break;
      case 'comparisonChart':
        result.push({
          componentId: comp.id,
          componentType: comp.type,
          text: comp.ourProductName,
          fieldName: 'ourProductName',
          fontSize: 16,
          fontWeight: 700,
        });
        result.push({
          componentId: comp.id,
          componentType: comp.type,
          text: comp.theirProductName,
          fieldName: 'theirProductName',
          fontSize: 16,
          fontWeight: 700,
        });
        comp.specs.forEach((sp, idx) => {
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: sp.name,
            fieldName: `specs[${idx}].name`,
            fontSize: 14,
            fontWeight: 500,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: sp.ourValue,
            fieldName: `specs[${idx}].ourValue`,
            fontSize: 14,
            fontWeight: 400,
          });
          result.push({
            componentId: comp.id,
            componentType: comp.type,
            text: sp.theirValue,
            fieldName: `specs[${idx}].theirValue`,
            fontSize: 14,
            fontWeight: 400,
          });
        });
        break;
    }
  });

  return result;
}

function getFieldMaxWidth(
  componentType: ComponentInstance['type'],
  fieldName: string,
  platform: PlatformConfig,
): number {
  const safeInnerWidth = platform.width - platform.safePaddingX * 2;
  switch (componentType) {
    case 'sellingPoints':
      return safeInnerWidth / 2 - 24;
    case 'parameterTable':
      return safeInnerWidth / 2 - 32;
    case 'buyerShowcase':
      return safeInnerWidth / 2 - 16;
    case 'afterSalePromise':
      return safeInnerWidth / 3 - 24;
    case 'comparisonChart':
      return safeInnerWidth / 2 - 24;
    default:
      return safeInnerWidth - 32;
  }
}

export function checkSafeArea(
  components: ComponentInstance[],
  platform: PlatformConfig,
): SafeAreaIssue[] {
  const issues: SafeAreaIssue[] = [];
  const fields = collectTextFields(components);

  for (const field of fields) {
    if (!field.text) continue;
    const maxWidth = getFieldMaxWidth(field.componentType, field.fieldName, platform);
    const textWidth = measureText(field.text, field.fontSize, field.fontWeight);
    if (textWidth > maxWidth) {
      const overflow = textWidth - maxWidth;
      issues.push({
        componentId: field.componentId,
        componentType: field.componentType,
        fieldName: field.fieldName,
        textContent: field.text,
        overflowDirection: 'right',
        overflowPixels: Number(overflow.toFixed(1)),
      });
    }
  }

  return issues;
}
