import React, { useMemo, useState } from 'react';
import { Copy, RefreshCw, SlidersHorizontal } from 'lucide-react';

function clamp01(n) { return Math.min(1, Math.max(0, n)); }

function hslToCss(h, s, l) { return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`; }

function createShades(h, s, l) {
  const steps = [0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3];
  return steps.map((light, i) => ({ key: (i + 1) * 100, value: hslToCss(h, s, light) }));
}

export default function Generator() {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(0.7);
  const [radius, setRadius] = useState(0.75);
  const [shadow, setShadow] = useState(0.25);

  const primary = useMemo(() => createShades(hue, clamp01(saturation), 0.5), [hue, saturation]);

  const cssVars = useMemo(() => {
    const base = primary[5]?.value || 'hsl(221 83% 53%)';
    return `:root{--radius:${Math.round(radius*16)}px;--shadow:${shadow};--primary:${base};}`;
  }, [primary, radius, shadow]);

  const tailwindSnippet = useMemo(() => {
    return `theme: { extend: { colors: { primary: { ${primary.map(p=>`${p.key}: '${p.value}'`).join(', ')} } }, borderRadius: { lg: 'var(--radius)', xl: 'calc(var(--radius) + 4px)' }, boxShadow: { glow: '0 8px 30px hsl(${Math.round(hue)} 90% ${Math.round((0.6+shadow*0.4)*100)}% / 0.45)' } } }`;
  }, [primary, hue, shadow]);

  const reactSnippet = useMemo(() => {
    return `export function Button({ children }){return (<button className=\"inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-white shadow-glow hover:bg-primary-700\">{children}</button>);}`;
  }, []);

  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); alert('Copied to clipboard'); } catch { alert('Copy failed'); }
  };

  const randomize = () => {
    setHue(Math.floor(Math.random()*360));
    setSaturation(0.5 + Math.random()*0.4);
    setRadius(Math.random());
    setShadow(Math.random()*0.6);
  };

  return (
    <section id="generator" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold sm:text-3xl">Live Generator</h2>
          <button onClick={randomize} className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm hover:border-slate-700">
            <RefreshCw className="h-4 w-4" /> Surprise me
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h3 className="flex items-center gap-2 text-lg font-medium"><SlidersHorizontal className="h-5 w-5" /> Theme controls</h3>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Hue ({Math.round(hue)})</label>
              <input type="range" min={0} max={360} value={hue} onChange={(e)=>setHue(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Saturation ({Math.round(saturation*100)}%)</label>
              <input type="range" min={0} max={1} step={0.01} value={saturation} onChange={(e)=>setSaturation(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Radius ({Math.round(radius*16)}px)</label>
              <input type="range" min={0} max={1} step={0.01} value={radius} onChange={(e)=>setRadius(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Shadow strength ({Math.round(shadow*100)}%)</label>
              <input type="range" min={0} max={1} step={0.01} value={shadow} onChange={(e)=>setShadow(Number(e.target.value))} className="w-full" />
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-5 gap-2">
                {primary.map(p => (
                  <div key={p.key} className="rounded-md p-2 text-center text-xs" style={{ background: p.value }}>
                    <span className="mix-blend-difference text-white">{p.key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-medium">Preview</h3>
              <style>{cssVars}</style>
              <div className="mt-4 space-y-4">
                <button className="rounded-lg bg-[var(--primary)] px-4 py-2 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]">Primary button</button>
                <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Input field" />
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-300">Card with custom radius and glow.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-medium">Export</h3>
              <div className="mt-3">
                <p className="text-xs text-slate-400">Tailwind config snippet</p>
                <pre className="mt-2 max-h-40 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-200">{tailwindSnippet}</pre>
                <button className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1.5 text-sm hover:border-slate-700" onClick={()=>copy(tailwindSnippet)}>
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>
              <div className="mt-5">
                <p className="text-xs text-slate-400">React Button snippet</p>
                <pre className="mt-2 max-h-40 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-200">{reactSnippet}</pre>
                <button className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1.5 text-sm hover:border-slate-700" onClick={()=>copy(reactSnippet)}>
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
