import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBuilderStore, useCurrentPlatform } from '@/store/builderStore';
import { useExportStore } from '@/store/exportStore';
import { COMPONENT_META } from '@/utils/platforms';
import { formatFileSizeKB } from '@/utils/exportUtils';
import { usePlatformSize } from '@/hooks/usePlatformSize';
import DetailRenderer from '@/components/builder/DetailRenderer';
import {
  ArrowLeft,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Type,
  FileJson,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

export default function ExportCheckPage() {
  const navigate = useNavigate();
  const components = useBuilderStore((s) => s.components);
  const selectComponent = useBuilderStore((s) => s.selectComponent);
  const platform = useCurrentPlatform();
  const { canvasStyle, canvasWidth, previewScale } = usePlatformSize(720);

  const isChecking = useExportStore((s) => s.isChecking);
  const result = useExportStore((s) => s.result);
  const runCheck = useExportStore((s) => s.runCheck);
  const exportJson = useExportStore((s) => s.exportJson);

  useEffect(() => {
    if (!result && !isChecking) {
      runCheck();
    }
  }, [result, isChecking, runCheck]);

  const highlightMap = useMemo(() => {
    if (!result) return {};
    const map: Record<string, { image: boolean; safeArea: boolean }> = {};
    result.imageIssues.forEach((i) => {
      map[i.componentId] = { ...(map[i.componentId] ?? { image: false, safeArea: false }), image: true };
    });
    result.safeAreaIssues.forEach((i) => {
      map[i.componentId] = { ...(map[i.componentId] ?? { image: false, safeArea: false }), safeArea: true };
    });
    return map;
  }, [result]);

  const gotoFix = (componentId: string) => {
    selectComponent(componentId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回工作台
          </button>
          <div>
            <h1 className="text-sm font-black text-slate-900">质量检查 & 导出</h1>
            <p className="text-[11px] text-slate-500">
              平台：{platform.name} · {platform.width}px · 安全区 ±{platform.safePaddingX}px
            </p>
          </div>
          <div className="flex-1" />
          <button
            onClick={runCheck}
            disabled={isChecking}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            重新检查
          </button>
          <button
            onClick={exportJson}
            disabled={!result || !result.passed}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-accent text-white text-sm font-bold shadow-lg shadow-accent-500/30 hover:shadow-accent-500/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            下载配置 JSON
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[420px_1fr] gap-8">
        <section className="space-y-5">
          {isChecking && (
            <div className="rounded-2xl bg-white p-8 border border-slate-200 shadow-card text-center">
              <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-brand-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">正在进行质量检查</h3>
              <p className="text-sm text-slate-500">正在分析图片体积和文字安全区...</p>
            </div>
          )}

          {result && (
            <>
              <div
                className={`rounded-2xl p-6 border-2 ${
                  result.passed
                    ? 'bg-success-500/5 border-success-500/20'
                    : 'bg-danger-500/5 border-danger-500/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      result.passed
                        ? 'bg-success-500 text-white'
                        : 'bg-danger-500 text-white'
                    }`}
                  >
                    {result.passed ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <AlertTriangle className="w-7 h-7" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl font-black ${
                        result.passed ? 'text-success-600' : 'text-danger-600'
                      }`}
                    >
                      {result.passed ? '检查通过！可以放心导出' : '发现一些问题需要修复'}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {result.passed
                        ? '所有图片符合大小要求，所有文字都在安全区内。'
                        : `共发现 ${result.imageIssues.length + result.safeAreaIssues.length} 个问题，请逐一修复后重新检查。`}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white p-4 text-center">
                    <div className="text-2xl font-black text-slate-900">{result.totalImages}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">图片总数</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center">
                    <div className="text-2xl font-black text-slate-900">
                      {formatFileSizeKB(result.totalImageSizeKB)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">图片总大小</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center">
                    <div className="text-2xl font-black text-slate-900">{components.length}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">组件模块</div>
                  </div>
                </div>
              </div>

              {result.imageIssues.length > 0 && (
                <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
                  <div className="px-5 py-4 bg-danger-50 border-b border-danger-100 flex items-center gap-2">
                    <ImageIcon className="w-4.5 h-4.5 text-danger-500" />
                    <h4 className="text-sm font-bold text-danger-700">
                      图片体积超标（{result.imageIssues.length}）
                    </h4>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {result.imageIssues.map((issue, i) => (
                      <div key={i} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              {COMPONENT_META[issue.componentType].name}
                            </span>
                            <code className="text-[11px] text-slate-500 font-mono">
                              {issue.fieldName}
                            </code>
                          </div>
                          <button
                            onClick={() => gotoFix(issue.componentId)}
                            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                          >
                            去修复
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            <img
                              src={issue.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-danger-500 text-white">
                                {issue.actualSizeKB} KB
                              </span>
                              <span className="text-[11px] text-slate-500">
                                / 限制 {issue.limitSizeKB} KB
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 truncate">{issue.imageUrl}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.safeAreaIssues.length > 0 && (
                <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
                  <div className="px-5 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                    <Type className="w-4.5 h-4.5 text-amber-600" />
                    <h4 className="text-sm font-bold text-amber-700">
                      文字超出安全区（{result.safeAreaIssues.length}）
                    </h4>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {result.safeAreaIssues.map((issue, i) => (
                      <div key={i} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              {COMPONENT_META[issue.componentType].name}
                            </span>
                            <code className="text-[11px] text-slate-500 font-mono">
                              {issue.fieldName}
                            </code>
                          </div>
                          <button
                            onClick={() => gotoFix(issue.componentId)}
                            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                          >
                            去修复
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                          <p className="text-sm text-slate-800 leading-relaxed break-all">
                            "{issue.textContent}"
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                              向右超出 {issue.overflowPixels}px
                            </span>
                            <span className="text-[11px] text-slate-500">
                              建议：精简文案或调整字号
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.passed && (
                <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-900 text-white p-6 overflow-hidden relative">
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5" />
                  <div className="absolute -right-5 bottom-0 w-24 h-24 rounded-full bg-white/5" />
                  <div className="relative">
                    <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                      <FileJson className="w-5 h-5" />
                      导出说明
                    </h4>
                    <ul className="space-y-1.5 text-sm opacity-90 mb-5">
                      <li>• 下载的 JSON 文件包含完整的组件配置和平台信息</li>
                      <li>• 可在详情页渲染引擎中直接使用此 JSON 渲染</li>
                      <li>• 所有图片 URL 均保留，建议部署到 CDN 后替换</li>
                    </ul>
                    <div className="flex gap-3">
                      <button
                        onClick={exportJson}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-700 text-sm font-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        下载配置 JSON
                      </button>
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-bold border border-white/20 hover:bg-white/25 transition-colors"
                      >
                        继续编辑
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="rounded-xl bg-white border border-slate-200 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                预览
              </span>
              <span className="text-xs text-slate-500">
                红色角标标记了存在问题的组件 · 点击"去修复"跳转编辑
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {(previewScale * 100).toFixed(0)}% 缩放
            </div>
          </div>

          <div className="rounded-[40px] bg-slate-900 p-5 shadow-device">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="w-16 h-1.5 rounded-full bg-slate-700" />
            </div>
            <div
              className="bg-slate-50 rounded-[28px] overflow-hidden mx-auto"
              style={{ width: canvasWidth, ...canvasStyle }}
            >
              {components.map((c) => {
                const issues = highlightMap[c.id];
                return (
                  <div
                    key={c.id}
                    className={`relative ${
                      issues ? 'ring-2 ring-danger-500 ring-inset' : ''
                    }`}
                  >
                    {issues && (
                      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
                        {issues.image && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-danger-500 text-white text-[10px] font-bold shadow-lg">
                            <ImageIcon className="w-3 h-3" /> 图片
                          </span>
                        )}
                        {issues.safeArea && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-lg">
                            <Type className="w-3 h-3" /> 文字
                          </span>
                        )}
                      </div>
                    )}
                    <DetailRenderer component={c} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
