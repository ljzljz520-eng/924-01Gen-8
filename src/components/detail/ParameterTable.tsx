import React from 'react';
import { FileText } from 'lucide-react';
import type { ParameterTableData } from '@/types';

interface Props {
  data: ParameterTableData;
}

export default function ParameterTable({ data }: Props) {
  const { title, rows, columns } = data;
  const grouped: Array<Array<{ name: string; value: string }>> = [];
  for (let i = 0; i < rows.length; i += columns) {
    grouped.push(rows.slice(i, i + columns));
  }

  return (
    <section className="py-10 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {title && (
        <div className="px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-3">
            <FileText className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-medium text-slate-700 tracking-wide">SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-slate-800" />
        </div>
      )}

      <div className="px-8">
        <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-slate-300 font-medium ml-2">产品规格参数表</span>
          </div>
          <table className="w-full">
            <tbody>
              {grouped.map((rowGroup, gi) => (
                <tr
                  key={gi}
                  className={gi % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                >
                  {Array.from({ length: columns }).map((_, ci) => {
                    const cell = rowGroup[ci];
                    return (
                      <React.Fragment key={`${gi}-${ci}`}>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-700 bg-slate-50/40 border-b border-slate-100 w-1/4 whitespace-nowrap">
                          {cell?.name ?? ''}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-900 border-b border-slate-100">
                          {cell?.value ?? ''}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
