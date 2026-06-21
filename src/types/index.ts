export type PlatformId = 'taobao' | 'jd' | 'pdd' | 'wx' | 'desktop';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  width: number;
  safePaddingX: number;
  safePaddingY: number;
  maxImageSizeKB: number;
  maxTotalImages: number;
}

export type ComponentType =
  | 'sellingPoints'
  | 'parameterTable'
  | 'buyerShowcase'
  | 'afterSalePromise'
  | 'comparisonChart';

export interface ComponentMeta {
  type: ComponentType;
  name: string;
  description: string;
  iconName: string;
}

export interface BaseComponentData {
  id: string;
  type: ComponentType;
  title?: string;
}

export interface SellingPointItem {
  icon: string;
  title: string;
  description: string;
}
export interface SellingPointsData extends BaseComponentData {
  type: 'sellingPoints';
  items: SellingPointItem[];
  style: 'card' | 'horizontal' | 'grid';
}

export interface ParameterRow {
  name: string;
  value: string;
}
export interface ParameterTableData extends BaseComponentData {
  type: 'parameterTable';
  rows: ParameterRow[];
  columns: 2 | 3;
}

export interface BuyerImage {
  url: string;
  userName: string;
  comment: string;
  rating: number;
}
export interface BuyerShowcaseData extends BaseComponentData {
  type: 'buyerShowcase';
  images: BuyerImage[];
  layout: 'grid' | 'carousel';
}

export interface PromiseItem {
  icon: string;
  title: string;
  detail: string;
}
export interface AfterSalePromiseData extends BaseComponentData {
  type: 'afterSalePromise';
  items: PromiseItem[];
  backgroundColor?: string;
}

export interface CompareSpec {
  name: string;
  ourValue: string;
  theirValue: string;
}
export interface ComparisonChartData extends BaseComponentData {
  type: 'comparisonChart';
  ourProductName: string;
  theirProductName: string;
  specs: CompareSpec[];
  ourImage: string;
  theirImage: string;
}

export type ComponentInstance =
  | SellingPointsData
  | ParameterTableData
  | BuyerShowcaseData
  | AfterSalePromiseData
  | ComparisonChartData;

export interface ImageIssue {
  componentId: string;
  componentType: ComponentType;
  imageUrl: string;
  fieldName: string;
  actualSizeKB: number;
  limitSizeKB: number;
}

export interface SafeAreaIssue {
  componentId: string;
  componentType: ComponentType;
  fieldName: string;
  textContent: string;
  overflowDirection: 'left' | 'right' | 'both';
  overflowPixels: number;
}

export interface ExportCheckResult {
  passed: boolean;
  totalImages: number;
  totalImageSizeKB: number;
  imageIssues: ImageIssue[];
  safeAreaIssues: SafeAreaIssue[];
  timestamp: number;
}
