import {
  Truck,
  Clock,
  RotateCcw,
  ShieldAlert,
  Wrench,
  Headphones,
  ShieldCheck,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';
import type { AfterSalePromiseData } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Truck, Clock, RotateCcw, ShieldAlert, Wrench, Headphones, ShieldCheck, BadgeCheck,
};

interface Props {
  data: AfterSalePromiseData;
}

export default function AfterSalePromise({ data }: Props) {
  const { title, items, backgroundColor = '#F0FDF4' } = data;

  return (
    <section
      className="py-10"
      style={{ background: `linear-gradient(180deg, ${backgroundColor} 0%, #ffffff 100%)` }}
    >
      {title && (
        <div className="px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700 tracking-wide">BUY WITH CONFIDENCE</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-emerald-500" />
          <p className="mt-3 text-sm text-slate-600">专业服务 · 用心保障 · 购物无忧</p>
        </div>
      )}

      <div className="px-8 grid grid-cols-3 gap-4">
        {items.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || ShieldCheck;
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-5 text-center border border-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-3 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white transition-all duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
