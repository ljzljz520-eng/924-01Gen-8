import {
  SellingPointsData,
  ParameterTableData,
  BuyerShowcaseData,
  AfterSalePromiseData,
  ComparisonChartData,
  ComponentType,
  ComponentInstance,
} from '@/types';

let idCounter = 0;
export const generateId = (type: ComponentType) =>
  `${type}_${Date.now().toString(36)}_${(++idCounter).toString(36)}`;

const IMG_1 =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
const IMG_2 =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';
const IMG_3 =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
const IMG_4 =
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80';
const IMG_5 =
  'https://images.unsplash.com/photo-1600003263720-95b45a4035d5?auto=format&fit=crop&w=800&q=80';
const IMG_6 =
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80';

export function createSellingPoints(): SellingPointsData {
  return {
    id: generateId('sellingPoints'),
    type: 'sellingPoints',
    title: '核心卖点',
    style: 'grid',
    items: [
      {
        icon: 'Zap',
        title: '极速发货',
        description: '24小时内闪电发货，全国3日必达',
      },
      {
        icon: 'Shield',
        title: '正品保障',
        description: '官方授权100%正品，支持专柜验货',
      },
      {
        icon: 'Gift',
        title: '买一赠三',
        description: '下单即赠豪华配件大礼包',
      },
      {
        icon: 'RefreshCw',
        title: '7天无理由',
        description: '不满意随时退，来回运费全免',
      },
    ],
  };
}

export function createParameterTable(): ParameterTableData {
  return {
    id: generateId('parameterTable'),
    type: 'parameterTable',
    title: '产品参数',
    columns: 2,
    rows: [
      { name: '品牌', value: '官方旗舰品牌' },
      { name: '型号', value: 'PRO MAX 2024' },
      { name: '产地', value: '中国·深圳' },
      { name: '材质', value: '航空级铝合金 + 钢化玻璃' },
      { name: '尺寸', value: '160×80×9 mm' },
      { name: '重量', value: '约 320g' },
      { name: '续航', value: '最长可达 36 小时' },
      { name: '充电', value: 'Type-C 快充 60分钟充满' },
      { name: '防水等级', value: 'IP68 级防尘防水' },
      { name: '保修期限', value: '全国联保 2 年' },
    ],
  };
}

export function createBuyerShowcase(): BuyerShowcaseData {
  return {
    id: generateId('buyerShowcase'),
    type: 'buyerShowcase',
    title: '真实买家秀',
    layout: 'grid',
    images: [
      {
        url: IMG_1,
        userName: '小**橙',
        comment: '质量非常好！做工精致，包装也很精美，满意！',
        rating: 5,
      },
      {
        url: IMG_2,
        userName: '爱购物的喵',
        comment: '颜色比图片还好看，朋友见了都问链接～',
        rating: 5,
      },
      {
        url: IMG_3,
        userName: '数码控Kevin',
        comment: '性能超出预期，续航很给力，值得入手！',
        rating: 5,
      },
      {
        url: IMG_4,
        userName: 'Mr.Liang',
        comment: '手感很棒，细节处理到位，给店家点赞',
        rating: 4,
      },
    ],
  };
}

export function createAfterSalePromise(): AfterSalePromiseData {
  return {
    id: generateId('afterSalePromise'),
    type: 'afterSalePromise',
    title: '售后保障',
    backgroundColor: '#FFF7ED',
    items: [
      { icon: 'Truck', title: '顺丰包邮', detail: '全国顺丰免邮费' },
      { icon: 'Clock', title: '极速发货', detail: '24小时内发货' },
      { icon: 'RotateCcw', title: '无忧退换', detail: '7天无理由退换' },
      { icon: 'ShieldAlert', title: '正品保障', detail: '假一赔十承诺' },
      { icon: 'Wrench', title: '两年保修', detail: '全国联保两年' },
      { icon: 'Headphones', title: 'VIP客服', detail: '7×24小时专属服务' },
    ],
  };
}

export function createComparisonChart(): ComparisonChartData {
  return {
    id: generateId('comparisonChart'),
    type: 'comparisonChart',
    title: '实力对比·选我们更放心',
    ourProductName: '我们的产品',
    theirProductName: '普通竞品',
    ourImage: IMG_5,
    theirImage: IMG_6,
    specs: [
      { name: '材质工艺', ourValue: '航空级铝合金 CNC 精雕', theirValue: '普通塑料 注塑成型' },
      { name: '电池容量', ourValue: '5000mAh 高密度电芯', theirValue: '3000mAh 普通锂电' },
      { name: '防水等级', ourValue: 'IP68 深度防水', theirValue: '不支持防水' },
      { name: '保修时长', ourValue: '全国联保 24 个月', theirValue: '店保 3 个月' },
      { name: '售后服务', ourValue: '7×24 专属 VIP 客服', theirValue: '工作日在线回复' },
    ],
  };
}

export function createComponentByType(type: ComponentType): ComponentInstance {
  switch (type) {
    case 'sellingPoints':
      return createSellingPoints();
    case 'parameterTable':
      return createParameterTable();
    case 'buyerShowcase':
      return createBuyerShowcase();
    case 'afterSalePromise':
      return createAfterSalePromise();
    case 'comparisonChart':
      return createComparisonChart();
  }
}

export function createInitialDemoComponents(): ComponentInstance[] {
  return [
    createSellingPoints(),
    createParameterTable(),
    createBuyerShowcase(),
    createAfterSalePromise(),
    createComparisonChart(),
  ];
}
