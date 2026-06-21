import type { PlatformConfig, PlatformId, ComponentMeta, ComponentType } from '@/types';

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  taobao: {
    id: 'taobao',
    name: '淘宝/天猫',
    width: 750,
    safePaddingX: 24,
    safePaddingY: 0,
    maxImageSizeKB: 2048,
    maxTotalImages: 30,
  },
  jd: {
    id: 'jd',
    name: '京东',
    width: 750,
    safePaddingX: 20,
    safePaddingY: 0,
    maxImageSizeKB: 2048,
    maxTotalImages: 30,
  },
  pdd: {
    id: 'pdd',
    name: '拼多多',
    width: 750,
    safePaddingX: 16,
    safePaddingY: 0,
    maxImageSizeKB: 2048,
    maxTotalImages: 30,
  },
  wx: {
    id: 'wx',
    name: '微信小程序',
    width: 750,
    safePaddingX: 32,
    safePaddingY: 0,
    maxImageSizeKB: 2048,
    maxTotalImages: 30,
  },
  desktop: {
    id: 'desktop',
    name: '桌面端详情',
    width: 1200,
    safePaddingX: 48,
    safePaddingY: 0,
    maxImageSizeKB: 2048,
    maxTotalImages: 30,
  },
};

export const PLATFORM_ORDER: PlatformId[] = ['taobao', 'jd', 'pdd', 'wx', 'desktop'];

export const COMPONENT_META: Record<ComponentType, ComponentMeta> = {
  sellingPoints: {
    type: 'sellingPoints',
    name: '卖点区',
    description: '突出产品核心卖点',
    iconName: 'Sparkles',
  },
  parameterTable: {
    type: 'parameterTable',
    name: '参数表',
    description: '展示详细规格参数',
    iconName: 'Table2',
  },
  buyerShowcase: {
    type: 'buyerShowcase',
    name: '买家秀',
    description: '真实用户晒单展示',
    iconName: 'Camera',
  },
  afterSalePromise: {
    type: 'afterSalePromise',
    name: '售后承诺',
    description: '增强购买信心',
    iconName: 'ShieldCheck',
  },
  comparisonChart: {
    type: 'comparisonChart',
    name: '对比图',
    description: '与竞品优势对比',
    iconName: 'GitCompare',
  },
};

export const COMPONENT_ORDER: ComponentType[] = [
  'sellingPoints',
  'parameterTable',
  'buyerShowcase',
  'afterSalePromise',
  'comparisonChart',
];
