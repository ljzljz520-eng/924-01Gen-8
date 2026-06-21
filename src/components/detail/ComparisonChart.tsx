import React from 'react';
import { Check, X, Crown, Award } from 'lucide-react';
import type { ComparisonChartData } from '@/types';

interface Props {
  data: ComparisonChartData;
}

export default function ComparisonChart({ data }: Props) {
  const { title, ourProductName, theirProductName, specs, ourImage, theirImage } = data;

  return (
    <section className="py-10 bg-gradient-to-b from-white via-slate-50 to-white">
      {title && (
        <div className="px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 tracking-wide">COMPARISON</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-brand-600" />
        </div>
      )}

      <div className="px-8">
        <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-card">
          <div className="grid grid-cols-[90px_1fr_1fr]">
            <div className="bg-slate-50" />
            <div className="relative bg-gradient-to-br from-brand-500 to-brand-900 text-white p-5">
              <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold">
                <Crown className="w-3 h-3" /> RECOMMENDED
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/10 mb-4 mt-4">
                <img src={ourImage} alt="our" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-black">{ourProductName}</h3>
            </div>
            <div className="bg-slate-50 p-5 border-l border-slate-200">
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-200 mb-4">
                <img src={theirImage} alt="their" className="w-full h-full object-cover opacity-90" />
              </div>
              <h3 className="text-xl font-bold text-slate-500">{theirProductName}</h3>
            </div>

            {specs.map((spec, i) => (
              <React.Fragment key={i}>
                <div
                  className={`flex items-center justify-center px-3 text-xs font-semibold text-slate-600 ${
                    i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  } border-t border-slate-200`}
                >
                  {spec.name}
                </div>
                <div
                  className={`flex items-center gap-2 px-5 py-4 border-t border-slate-200/60 ${
                    i % 2 === 0 ? 'bg-brand-50/60' : 'bg-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 leading-snug">
                    {spec.ourValue}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 px-5 py-4 border-t border-l border-slate-200 ${
                    i % 2 === 0 ? 'bg-slate-50' : 'bg-slate-25'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-500 leading-snug">{spec.theirValue}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
