import { useNavigate } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { useExportStore } from '@/store/exportStore';
import { PLATFORMS, PLATFORM_ORDER } from '@/utils/platforms';
import { PackageOpen, RotateCcw, Monitor, Smartphone, Download, Eye, CheckCircle2 } from 'lucide-react';

export default function TopToolbar() {
  const navigate = useNavigate();
  const platform = useBuilderStore((s) => s.platform);
  const setPlatform = useBuilderStore((s) => s.setPlatform);
  const reset = useBuilderStore((s) => s.reset);
  const components = useBuilderStore((s) => s.components);
  const result = useExportStore((s) => s.result);
  const runCheck = useExportStore((s) => s.runCheck);
  const isChecking = useExportStore((s) => s.isChecking);

  const handleExport = async () => {
    await runCheck();
    navigate('/export');
  };

  return (
    <header className="h-16 shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex items-center px-6 gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-md shadow-brand-500/30">
          <PackageOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-black text-slate-900 leading-tight">详情页搭建台</h1>
          <p className="text-[11px] text-slate-500 leading-tight">组件库 · 多平台 · 质量检查</p>
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200 mx-2" />

      <div className="flex-1 flex items-center justify-center">
        <div className="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
          {PLATFORM_ORDER.map((pid) => {
            const cfg = PLATFORMS[pid];
            const isDesktop = pid === 'desktop';
            const active = platform === pid;
            return (
              <button
                key={pid}
                onClick={() => setPlatform(pid)}
                className={`segmented-btn ${active ? 'active' : ''} flex items-center gap-1.5`}
              >
                {isDesktop ? (
                  <Monitor className="w-3.5 h-3.5" />
                ) : (
                  <Smartphone className="w-3.5 h-3.5" />
                )}
                <span>{cfg.name}</span>
                <span className="text-[10px] opacity-70">{cfg.width}px</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {result && result.passed && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-50 border border-success-500/20 text-success-700 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            检查通过
          </span>
        )}
        {result && !result.passed && (
          <button
            onClick={() => navigate('/export')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-danger-50 border border-danger-500/20 text-danger-700 text-xs font-semibold hover:bg-danger-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            发现问题 ({result.imageIssues.length + result.safeAreaIssues.length})
          </button>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重置
        </button>
        <button
          onClick={handleExport}
          disabled={components.length === 0 || isChecking}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-accent text-white text-sm font-bold shadow-lg shadow-accent-500/30 hover:shadow-accent-500/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Download className="w-4 h-4" />
          {isChecking ? '检查中...' : '导出 & 检查'}
        </button>
      </div>
    </header>
  );
}
