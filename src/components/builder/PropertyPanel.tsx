import { useBuilderStore } from '@/store/builderStore';
import { COMPONENT_META } from '@/utils/platforms';
import { ImagePlus, Plus, Trash2, ChevronUp, ChevronDown, Eye, Type } from 'lucide-react';
import type { ComponentInstance, ParameterRow, CompareSpec } from '@/types';

const TEXT_INPUT_STYLE =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all placeholder:text-slate-400';

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50/60">
        {Icon && <Icon className="w-4 h-4 text-brand-600" />}
        <h4 className="text-sm font-bold text-slate-800 flex-1">{title}</h4>
      </div>
      <div className="px-5 py-4 space-y-3">{children}</div>
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
      {children}
      {required && <span className="text-danger-500">*</span>}
    </label>
  );
}

function ImageField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-6 h-6 text-slate-300" />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="粘贴图片 URL"
          className={`${TEXT_INPUT_STYLE} flex-1 text-xs`}
        />
      </div>
    </div>
  );
}

export default function PropertyPanel() {
  const { components, selectedComponentId, updateComponent } = useBuilderStore();
  const selected = components.find((c) => c.id === selectedComponentId) || null;

  const update = <T extends ComponentInstance>(patch: Partial<T>) => {
    if (!selected) return;
    updateComponent<T>(selected.id, patch);
  };

  if (!selected) {
    return (
      <aside className="w-80 shrink-0 h-full border-l border-slate-200 bg-white flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-gradient-accent" />
            属性编辑
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-sm font-bold text-slate-700 mb-1">未选中组件</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            点击画布中的任意组件以编辑内容、图片和样式参数
          </p>
        </div>
      </aside>
    );
  }

  const meta = COMPONENT_META[selected.type];

  return (
    <aside className="w-80 shrink-0 h-full border-l border-slate-200 bg-white flex flex-col">
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{meta.name} · 属性</h2>
            <p className="text-xs text-slate-500 mt-0.5">修改内容将实时同步至画布</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        <Section title="基础设置">
          <div>
            <Label>模块标题</Label>
            <input
              type="text"
              value={selected.title ?? ''}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="如：核心卖点"
              className={TEXT_INPUT_STYLE}
            />
          </div>
        </Section>

        {selected.type === 'sellingPoints' && (
          <Section title="卖点列表">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">共 {selected.items.length} 个卖点</span>
              <button
                onClick={() =>
                  update({
                    items: [
                      ...selected.items,
                      { icon: 'Sparkles', title: '新卖点', description: '补充卖点描述' },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
              >
                <Plus className="w-3 h-3" /> 新增
              </button>
            </div>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {selected.items.map((it, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-3 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500">#{i + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={i === 0}
                        onClick={() => {
                          const arr = [...selected.items];
                          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                          update({ items: arr });
                        }}
                        className="p-1 rounded hover:bg-white disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3 text-slate-500" />
                      </button>
                      <button
                        disabled={i === selected.items.length - 1}
                        onClick={() => {
                          const arr = [...selected.items];
                          [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
                          update({ items: arr });
                        }}
                        className="p-1 rounded hover:bg-white disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </button>
                      <button
                        onClick={() =>
                          update({ items: selected.items.filter((_, idx) => idx !== i) })
                        }
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={it.title}
                    onChange={(e) => {
                      const arr = [...selected.items];
                      arr[i] = { ...arr[i], title: e.target.value };
                      update({ items: arr });
                    }}
                    className={`${TEXT_INPUT_STYLE} text-xs mb-1.5`}
                    placeholder="卖点标题"
                  />
                  <textarea
                    value={it.description}
                    onChange={(e) => {
                      const arr = [...selected.items];
                      arr[i] = { ...arr[i], description: e.target.value };
                      update({ items: arr });
                    }}
                    rows={2}
                    className={`${TEXT_INPUT_STYLE} text-xs resize-none`}
                    placeholder="卖点描述"
                  />
                </div>
              ))}
            </div>
          </Section>
        )}

        {selected.type === 'parameterTable' && (
          <Section title="参数行">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">共 {selected.rows.length} 行</span>
              <button
                onClick={() =>
                  update({ rows: [...selected.rows, { name: '参数名', value: '参数值' }] })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
              >
                <Plus className="w-3 h-3" /> 新增
              </button>
            </div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {selected.rows.map((row, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <input
                      value={row.name}
                      onChange={(e) => {
                        const arr = [...selected.rows] as ParameterRow[];
                        arr[i] = { ...arr[i], name: e.target.value };
                        update({ rows: arr });
                      }}
                      className={`${TEXT_INPUT_STYLE} text-xs`}
                      placeholder="名称"
                    />
                    <input
                      value={row.value}
                      onChange={(e) => {
                        const arr = [...selected.rows] as ParameterRow[];
                        arr[i] = { ...arr[i], value: e.target.value };
                        update({ rows: arr });
                      }}
                      className={`${TEXT_INPUT_STYLE} text-xs`}
                      placeholder="值"
                    />
                  </div>
                  <button
                    onClick={() => update({ rows: selected.rows.filter((_, idx) => idx !== i) })}
                    className="p-1.5 rounded-lg hover:bg-red-50 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        )}

        {selected.type === 'buyerShowcase' && (
          <Section title="买家秀内容">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">共 {selected.images.length} 条</span>
              <button
                onClick={() =>
                  update({
                    images: [
                      ...selected.images,
                      {
                        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
                        userName: '新用户',
                        comment: '用户评价内容',
                        rating: 5,
                      },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100"
              >
                <Plus className="w-3 h-3" /> 新增
              </button>
            </div>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {selected.images.map((b, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-3 bg-slate-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">#{i + 1}</span>
                    <button
                      onClick={() =>
                        update({ images: selected.images.filter((_, idx) => idx !== i) })
                      }
                      className="p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                  <ImageField
                    label="图片"
                    value={b.url}
                    onChange={(v) => {
                      const arr = [...selected.images];
                      arr[i] = { ...arr[i], url: v };
                      update({ images: arr });
                    }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>用户名</Label>
                      <input
                        value={b.userName}
                        onChange={(e) => {
                          const arr = [...selected.images];
                          arr[i] = { ...arr[i], userName: e.target.value };
                          update({ images: arr });
                        }}
                        className={`${TEXT_INPUT_STYLE} text-xs`}
                      />
                    </div>
                    <div>
                      <Label>评分</Label>
                      <select
                        value={b.rating}
                        onChange={(e) => {
                          const arr = [...selected.images];
                          arr[i] = { ...arr[i], rating: Number(e.target.value) };
                          update({ images: arr });
                        }}
                        className={`${TEXT_INPUT_STYLE} text-xs`}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n} 星</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>评价内容</Label>
                    <textarea
                      value={b.comment}
                      onChange={(e) => {
                        const arr = [...selected.images];
                        arr[i] = { ...arr[i], comment: e.target.value };
                        update({ images: arr });
                      }}
                      rows={2}
                      className={`${TEXT_INPUT_STYLE} text-xs resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {selected.type === 'afterSalePromise' && (
          <Section title="承诺项列表">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">共 {selected.items.length} 项</span>
              <button
                onClick={() =>
                  update({
                    items: [
                      ...selected.items,
                      { icon: 'ShieldCheck', title: '新承诺', detail: '承诺详细说明' },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100"
              >
                <Plus className="w-3 h-3" /> 新增
              </button>
            </div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {selected.items.map((it, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 rounded-xl border border-slate-200 p-3 bg-slate-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">#{i + 1}</span>
                      <button
                        onClick={() =>
                          update({ items: selected.items.filter((_, idx) => idx !== i) })
                        }
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                    <input
                      value={it.title}
                      onChange={(e) => {
                        const arr = [...selected.items];
                        arr[i] = { ...arr[i], title: e.target.value };
                        update({ items: arr });
                      }}
                      className={`${TEXT_INPUT_STYLE} text-xs`}
                      placeholder="标题"
                    />
                    <input
                      value={it.detail}
                      onChange={(e) => {
                        const arr = [...selected.items];
                        arr[i] = { ...arr[i], detail: e.target.value };
                        update({ items: arr });
                      }}
                      className={`${TEXT_INPUT_STYLE} text-xs`}
                      placeholder="说明"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Label>背景色</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={selected.backgroundColor || '#F0FDF4'}
                  onChange={(e) => update({ backgroundColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-slate-200 p-1 bg-white"
                />
                <input
                  value={selected.backgroundColor || ''}
                  onChange={(e) => update({ backgroundColor: e.target.value })}
                  className={`${TEXT_INPUT_STYLE} text-xs flex-1`}
                  placeholder="#F0FDF4"
                />
              </div>
            </div>
          </Section>
        )}

        {selected.type === 'comparisonChart' && (
          <>
            <Section title="产品信息">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>我方产品名</Label>
                  <input
                    value={selected.ourProductName}
                    onChange={(e) => update({ ourProductName: e.target.value })}
                    className={`${TEXT_INPUT_STYLE} text-xs`}
                  />
                </div>
                <div>
                  <Label>竞品名称</Label>
                  <input
                    value={selected.theirProductName}
                    onChange={(e) => update({ theirProductName: e.target.value })}
                    className={`${TEXT_INPUT_STYLE} text-xs`}
                  />
                </div>
              </div>
              <ImageField
                label="我方产品图"
                value={selected.ourImage}
                onChange={(v) => update({ ourImage: v })}
              />
              <ImageField
                label="竞品图片"
                value={selected.theirImage}
                onChange={(v) => update({ theirImage: v })}
              />
            </Section>
            <Section title="对比项">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">共 {selected.specs.length} 项</span>
                <button
                  onClick={() =>
                    update({
                      specs: [...selected.specs, { name: '对比项', ourValue: '我方优势', theirValue: '竞品劣势' } as CompareSpec],
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100"
                >
                  <Plus className="w-3 h-3" /> 新增
                </button>
              </div>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {selected.specs.map((sp, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-3 bg-slate-50/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">#{i + 1}</span>
                      <button
                        onClick={() =>
                          update({ specs: selected.specs.filter((_, idx) => idx !== i) })
                        }
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                    <input
                      value={sp.name}
                      onChange={(e) => {
                        const arr = [...selected.specs] as CompareSpec[];
                        arr[i] = { ...arr[i], name: e.target.value };
                        update({ specs: arr });
                      }}
                      className={`${TEXT_INPUT_STYLE} text-xs`}
                      placeholder="对比项名称"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={sp.ourValue}
                        onChange={(e) => {
                          const arr = [...selected.specs] as CompareSpec[];
                          arr[i] = { ...arr[i], ourValue: e.target.value };
                          update({ specs: arr });
                        }}
                        className={`${TEXT_INPUT_STYLE} text-xs`}
                        placeholder="我方"
                      />
                      <input
                        value={sp.theirValue}
                        onChange={(e) => {
                          const arr = [...selected.specs] as CompareSpec[];
                          arr[i] = { ...arr[i], theirValue: e.target.value };
                          update({ specs: arr });
                        }}
                        className={`${TEXT_INPUT_STYLE} text-xs`}
                        placeholder="竞品"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}
      </div>
    </aside>
  );
}
