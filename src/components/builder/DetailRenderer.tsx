import SellingPoints from '@/components/detail/SellingPoints';
import ParameterTable from '@/components/detail/ParameterTable';
import BuyerShowcase from '@/components/detail/BuyerShowcase';
import AfterSalePromise from '@/components/detail/AfterSalePromise';
import ComparisonChart from '@/components/detail/ComparisonChart';
import type { ComponentInstance } from '@/types';

interface Props {
  component: ComponentInstance;
}

export default function DetailRenderer({ component }: Props) {
  switch (component.type) {
    case 'sellingPoints':
      return <SellingPoints data={component} />;
    case 'parameterTable':
      return <ParameterTable data={component} />;
    case 'buyerShowcase':
      return <BuyerShowcase data={component} />;
    case 'afterSalePromise':
      return <AfterSalePromise data={component} />;
    case 'comparisonChart':
      return <ComparisonChart data={component} />;
    default:
      return null;
  }
}
