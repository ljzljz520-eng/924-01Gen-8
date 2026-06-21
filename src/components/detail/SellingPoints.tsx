import {
  Zap,
  Shield,
  Gift,
  RefreshCw,
  Sparkles,
  Award,
  Leaf,
  Heart,
  Star,
  Rocket,
  Crown,
  Flame,
  type LucideIcon,
} from 'lucide-react';
import type { SellingPointsData } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Shield, Gift, RefreshCw, Sparkles, Award, Leaf, Heart, Star, Rocket, Crown, Flame,
};

interface Props {
  data: SellingPointsData;
}

export default function SellingPoints({ data }: Props) {
  const { title, items, style } = data;

  return (
    <section className="bg-white py-10">
      {title && (
        <div className="px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-50 to-accent-400/10 border border-brand-100 mb-3">
            <Sparkles className="w-4 h-4 text-accent-500" />
            <span className="text-xs font-medium text-brand-700 tracking-wide">HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-brand" />
        </div>
      )}

      {style === 'grid' ? (
        <div className="px-8 grid grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 hover:shadow-card hover:border-brand-100 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand-500/5 to-accent-500/5 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-500/20 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : style === 'horizontal' ? (
        <div className="px-8 space-y-3">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <div
                key={i}
                className="flex items-center gap-5 rounded-xl p-5 bg-slate-50 hover:bg-brand-50/40 transition-colors"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center shadow-md shadow-accent-500/20">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-6">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-8 grid grid-cols-1 gap-4">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white">
                <Icon className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
